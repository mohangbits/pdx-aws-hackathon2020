
'use strict';

const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Tableau Dashboard');
    },
    'ShowTableauFilterIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var filterNumber = this.event.request.intent.slots.number.value;
        
        var params = {
            TableName: "TableauFilters",
            Key:{
                "filterId": 0,
            },
            UpdateExpression: "set filterToShow = :newFilterNumber",
            ExpressionAttributeValues: {
                ":newFilterNumber" : filterNumber
            }
        };
        docClient.update(params, (() => {
           this.emit(':ask', 'you said filter '+ filterNumber);
        }));
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'you can ask for a tableau filter by saying show filter 1');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

