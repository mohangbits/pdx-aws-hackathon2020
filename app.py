#!/usr/bin/python
from flask import Flask, jsonify
from flask import json
from flask import request
from flask_cors import CORS, cross_origin


# data = {"Region": "East", "Year": "2018"}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/post/records', methods=['POST'])
@cross_origin()
def api_message():

    if request.headers['Content-Type'] == 'application/json':
        with open('/home/ec2-user/data.json', 'w') as f:
            web_browsers = request.data
            f.writelines(web_browsers)
        return "success"
    else:
        return "error"

    # data = {'Region': 'East', 'Year': '2018'}


@app.route('/get/records', methods=['GET'])
@cross_origin()
def get_tasks():
    with open('/home/ec2-user/data.json') as f:
        data = json.load(f)
        print("dataprint", data)
        print("typedata", type(data))
        return data


if __name__ == '__main__':
    app.run(host='0.0.0.0')
