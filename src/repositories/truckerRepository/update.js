'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
  });

// It is recommended that we instantiate AWS clients outside the scope of the handler
// to take advantage of connection re-use.
const docClient = new AWS.DynamoDB.DocumentClient();

exports.update = (event, context, callback) => {
  const { id } = event.pathParameters;
  const body_output = JSON.parse(event.body)
  const params = {
    TableName: "trucker_health_mocks",
    Key: {
      "id": id
    },
    UpdateExpression: `SET trucker_current_trip_time = :trucker_current_trip_time, 
                        trucker_name = :trucker_name, 
                        trucker_did_press_emergency_button = :trucker_did_press_emergency_button, 
                        trucker_ranking_pos = :trucker_ranking_pos, 
                        trucker_cpf = :trucker_cpf, 
                        trucker_end_trip_time = :trucker_end_trip_time, 
                        trucker_start_trip_time = :trucker_start_trip_time, 
                        trucker_license_plate = :trucker_license_plate, 
                        trucker_points = :trucker_points`,
    ExpressionAttributeValues:{
      ":trucker_current_trip_time": body_output["trucker_current_trip_time"],
      ":trucker_name": body_output["trucker_current_trip_time"],
      ":trucker_ranking_pos": body_output["trucker_ranking_pos"],
      ":trucker_cpf": body_output["trucker_cpf"],
      ":trucker_end_trip_time": body_output["trucker_end_trip_time"],
      ":trucker_start_trip_time": body_output["trucker_start_trip_time"],
      ":trucker_license_plate": body_output["trucker_license_plate"],
      ":trucker_points": body_output["trucker_points"]
    },
    ReturnValues:"UPDATED_NEW"
  };

  docClient.update(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      const ok_response = {
        "statusCode": 200,
        "body": JSON.stringify(data),
        "isBase64Encoded": false,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
      };

      callback(null, ok_response)
    }
  });
};
