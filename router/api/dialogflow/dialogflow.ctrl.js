const dialogflow=require('dialogflow');

exports.dialogflow=async(req,res)=>{
    const sessionAuthClient=new dialogflow.SessionsClient({
        credentials: {
            private_key: req.app.get('private_key'),
            client_email: req.app.get('client_email')
        }
    });
    const sessionPath=await sessionAuthClient.sessionPath(req.app.get('project_id'),req.query.token);
    const data=await sessionAuthClient.detectIntent({
        session: sessionPath,
        queryInput: {
            text:{
                text: req.query.text,
                languageCode: "ko-KR"
            }
        }
    });
    res.send({text: data[0].queryResult.fulfillmentText});
}