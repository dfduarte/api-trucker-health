'use strict';

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const uuidV4 = require('uuid/v4');

const table = "trucker_health_mocks";

exports.create = function(event, context, callback){
  const body_output = JSON.parse(event.body)
  console.log(body_output)
  const params = {
    TableName: table,
    Item:{
      "id": uuidV4(),
      "trucker_current_trip_time": body_output["trucker_current_trip_time"],
      "trucker_name": body_output["trucker_current_trip_time"],
      "trucker_ranking_pos": body_output["trucker_ranking_pos"],
      "trucker_cpf": body_output["trucker_cpf"],
      "trucker_end_trip_time": body_output["trucker_end_trip_time"],
      "trucker_start_trip_time": body_output["trucker_start_trip_time"],
      "trucker_license_plate": body_output["trucker_license_plate"],
      "trucker_points": body_output["trucker_points"]
    },
  };
  docClient.put(params, function(err, data){
    if (err) {
      console.error("Unable to put item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      const ok_response = {
        "statusCode": 200,
        "body": JSON.stringify(data.Items),
        "isBase64Encoded": false,
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
      };

      callback(null, ok_response)
    }
  });
}
