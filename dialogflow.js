const dialogflow = require('@google-cloud/dialogflow');
const config = require("./config");
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function sendToDialogFlow(msg, params) {
  let textToDialogFlow = msg;
  const sessionId = uuid.v4();
  try {
    const credentials = {
        client_email: config.GOOGLE_CLIENT_EMAIL,
        private_key: config.GOOGLE_PRIVATE_KEY,
      };
    const sessionClient = new dialogflow.SessionsClient({
        projectId: config.GOOGLE_PROJECT_ID,
        credentials,
      });
    const sessionPath = sessionClient.projectAgentSessionPath(
      config.GOOGLE_PROJECT_ID,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textToDialogFlow,
          languageCode: config.DF_LANGUAGE_CODE,
        },
      },
      queryParams: {
        payload: {
          data: params,
        },
      },
    };
    
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log(result)
    return result;

  } catch (e) {
    console.log("error");
    console.log(e);
  }
}

module.exports = {
  sendToDialogFlow,
};


sendToDialogFlow("prueba 1");