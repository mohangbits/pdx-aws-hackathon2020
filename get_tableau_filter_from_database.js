'use strict';

var AWS = require ("aws-sdk");

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "TableauFilters",
    Key: {
        "filterId": 0
    }
};

var filterToDisplay = "Filter not set";

exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error("ERROR: Invalid parameters");
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        filterToDisplay = obj.Item.filterToShow;
    
        callback(null, {"filterNumber":filterToDisplay});
    });
};
