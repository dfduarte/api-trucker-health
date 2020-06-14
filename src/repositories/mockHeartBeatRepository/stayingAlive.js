'use strict';

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const uuidV4 = require('uuid/v4');

const table = "trucker_health_mocks";

exports.beat = function(event, context, callback){
  const heart_beat = (Math.random() * (81 - 90) + 81).toFixed(0)

  const ok_response = {
    "statusCode": 200,
    "body": JSON.stringify( {"heart_beat": heart_beat} ),
    "isBase64Encoded": false,
    "headers": {
      "Access-Control-Allow-Origin": "*"
  
    }
  }
  callback(null, ok_response)
}
