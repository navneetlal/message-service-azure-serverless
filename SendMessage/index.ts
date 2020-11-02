import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { MongoClient } from 'mongodb';

const uri = process.env["MongodbConnectionString"] || 'mongodb://127.0.0.1:27017';

const SendMessage: AzureFunction = function (context: Context, req: HttpRequest) {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    const dbName = process.env.MongodbDatabaseName;
    const collectionName = process.env.MongodbCollectionName;

    console.log("dbName: ",dbName);
    console.log("collectionName: ", collectionName);

    MongoClient.connect(uri, function(error, client) {
        if (error) {
          context.log('Failed to connect');
          const response = { status: 500, body: { message: "Internal Server Error", statusCode: 500 } }
          context.done(null, response);
        }
        context.log('Connected');

        const messageBody = { ...req.body, name }
    
        client.db(dbName).collection(collectionName).insertOne(messageBody ,function(error, docs) {
          if (error) {
            context.log('Error running query');
            const response = { status: 500, body: { message: "Internal Server Error", statusCode: 500 } }
            context.done(null, response);
          }
    
          context.log('Success!');
          const response = {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
            body: messageBody
          };
          context.done(null, response);
        });
      });
      // const response = {
      //   status: 201,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: "Navneet"
      // };
      // context.done(null, response);

};

export default SendMessage;