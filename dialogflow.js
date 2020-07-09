'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    
    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }
  
    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    // 인텐트 종류
    // 공지사항 -> 공지사항-클래스룸 확인, 과제, 급식, 학사일정
    // 나머지(탈주, 넣을게...)는 dialogflow 자체 처리(서버 통신 필요x)

    function notification_check_classroom(agent) {

        agent.add(`클래스룸을 선택하세요.
        + 클래스룸 리스트`);
    }

    function notification(agent) {
        const classroom = request.body.queryResult.queryText;
        const date = request.body.queryResult.outputContexts[0].parameters["date-time"]
        // agent.add(공지사항 리스트);
    }

    function homework(agent) {  // 과제
        // 공지와 비슷하게 클래스룸 전체에서 과제 가져오는게 나을듯
    }

    function calendar(agent) {  // 학사일정
        const date = request.body.queryResult.parameters.date;  // ex) "2020-07-01T12:00:00+09:00"
        // 위의 날짜 정보 토대로 일정 긁어오기
    }

    function cafeteria(agent) {  // 급식
        const date = request.body.queryResult.parameters.date;  // ex) "2020-07-01T12:00:00+09:00"
        const meal = request.body.queryResult.parameters.meal;  // ex) [조식, 중식, 석식, 급식] 중 1
        // 위의 날짜 정보 토대로 급식정보 긁어오기
    }



    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('공지사항', notification_check_classroom);
    intentMap.set('과제', homework);
    intentMap.set('급식', cafeteria);
    intentMap.set('학사일정', calendar);
    agent.handleRequest(intentMap);
});
