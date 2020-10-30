import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { MongoClient } from 'mongodb';

const uri = process.env["MongodbConnectionUrl"] || 'mongodb+srv://OMITTED.mongodb.net/test';

const RetrieveMessage: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    MongoClient.connect(uri, function(error, client) {
        if (error) {
          context.log('Failed to connect');
          context.res = { status: 500, body: { message: "Internal Server Error", statusCode: 500 } }
          return context.done();
        }
        context.log('Connected');
    
        client.db('test').collection('tests').find({ name }).toArray(function(error, docs) {
          if (error) {
            context.log('Error running query');
            context.res = { status: 500, body: { message: "Internal Server Error", statusCode: 500 } }
            return context.done();
          }
    
          context.log('Success!');
          context.res = {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ res: docs })
          };
          context.done();     
        });
      });

};

export default RetrieveMessage;