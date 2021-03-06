const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "trucker_emergency_button_mock";

exports.query = function(event, context, callback){
  const { id } = event.pathParameters;
  console.log(id)
  const params = {
    TableName: table,
    Key: {
      "id": id
    }
  };

  docClient.get(params, function(err, data) {
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
}
