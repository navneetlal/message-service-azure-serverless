# Azure Functions Message Service

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fnavneetlal%2Fmessage-service-azure-serverless%2Fmain%2Fazuredeploy.json)

- Function App
- ConsmosDB (MongoAPI)

## Pre-requisite
- Azure Account
- [Azure Function Core Tool](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Ccsharp%2Cbash#v2)
- [az cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [NodeJS](https://nodejs.org/en/)

## Steps
### Step 1
- Fork this repository into your namespace.
- Click the `Deploy to Azure` Button on top of this page.
  - It will ask for the `resource group`, `site name`, `database name`, `collection name`.
  - After filling all the required field, click on **verify + create**

### Step 2
After completion of step 1, you have a `Function App` and `CosmosDB Database` with Mongo API. 

Next step will involve creating functions inside function app.

```bash
$ git clone https://github.com/<your-github-username>/message-service-azure-serverless
$ cd message-service-azure-serverless
$ npm i
$ npm run build

> message-service@1.0.0 build /home/<username>/<your-workspace>/message-service-azure-serverless
> tsc

$ func azure functionapp publish <function-app-name>

Getting site publishing info...
Creating archive for current directory...
Uploading 12.98 MB [##############################################################################]
Upload completed successfully.
Deployment completed successfully.
Syncing triggers...
Functions in <function-app-name>:
    RetrieveMessage - [httpTrigger]
        Invoke url: https://<function-app-name>.azurewebsites.net/api/retrievemessage

    SendMessage - [httpTrigger]
        Invoke url: https://<function-app-name>.azurewebsites.net/api/sendmessage

```

You will provided with the two invoke url for the functions

## End Result and Testing
```md
[POST] https://<function-app-name>.azurewebsites.net/api/sendmessage?name=David
body = { message: "Hi David, How are you?" }

[GET] https://<function-app-name>.azurewebsites.net/api/retrievemessage?name=David
```