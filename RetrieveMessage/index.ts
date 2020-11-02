import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { MongoClient } from 'mongodb';

const uri = process.env["MongodbConnectionString"] || 'mongodb://127.0.0.1:27017';

const RetrieveMessage: AzureFunction = function (context: Context, req: HttpRequest) {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    const dbName = process.env.MongodbDatabaseName;
    const collectionName = process.env.MongodbCollectionName;

    MongoClient.connect(uri, function(error, client) {
        if (error) {
          context.log('Failed to connect');
          const response = { status: 500, body: { message: "Internal Server Error", statusCode: 500 } }
          context.done(null, response);
        }
        context.log('Connected');
    
        client.db(dbName).collection(collectionName).find({ name }).toArray(function(error, docs) {
          if (error) {
            context.log('Error running query');
            const response = { status: 500, body: { message: "Internal Server Error", statusCode: 500 } }
            context.done(null, response);
          }
    
          context.log('Success!');
          const response = {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ res: docs })
          };
          context.done(null, response);     
        });
      });

};

export default RetrieveMessage;