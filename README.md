# Sonanada REST API
![](https://img.shields.io/static/v1?label=node&message=v12.14.0&color=red)
![](https://img.shields.io/static/v1?label=npm&message=v6.13.4&color=orange)
![](https://img.shields.io/static/v1?label=mysql&message=v8.0.20&color=yellow)
> - Developer<table>
>   <tr>
>      <td align="center">
>        <a href="https://github.com/woskaangel">
>        <img src="https://avatars0.githubusercontent.com/u/52520428?s=460&v=4" width="100px;" alt=""/>
>        <br/>
>        <b>woskaangel</b>
>      </td>
>      </a>
>      </td>
>    <tr>
> </table>

> - Languages
>     - [한국어](#한국어)
>     - [English](#english)
## 한국어
### 설치방법
#### Windows
1. 이 레포지토리를 내려받는다.
1. [node.js](https://nodejs.org/ko/) 인스톨러를 내려받아 설치(v7.6 이상)합니다. [npm](https://www.npmjs.com/)과 함께 설치되어야 합니다.
1. [MySQL](https://dev.mysql.com/downloads/windows/installer/8.0.html) 인스톨러를 내려받아 설치(v5.0.0 이상)합니다.
1. `./private`에 [config.js](#configjs)파일을 생성합니다.
1. 명령 프롬프트에서 `npm install`를 입력합니다.
1. `npm start`명령어를 실행시킵니다.
#### Linux
1. 이 레포지토리를 내려받는다.
1. 패키지 매니저를 이용하여 [node.js](https://nodejs.org/) 를 설치(v7.6 이상)합니다.
1. 패키지 매니저를 이용하여 [MySQL](https://dev.mysql.com/downloads/windows/installer/8.0.html) 을 설치(v5.0.0 이상)합니다.
1. `./private`에 [config.js](#configjs)파일을 생성합니다.
1. 쉘(Shell)에서 `npm install`를 입력합니다.
1. `npm start`명령어를 실행시킵니다.
#### 공통
- MySQL 데이터베이스 서버에 접속하기 위해 `aibee`데이터베이스를 생성해주세요.
- 폴더 `./private`에 [config.js](#configjs)파일을 **반드시** 만들어 주세요. 본 레포지토리에는 각 파일의 양식이 들어가 있습니다.
- [구글클래스룸 API](https://developers.google.com/classroom)를 사용할 경우 **반드시** client id를 발급받아야합니다. client id를 발급받는 방법은 [구글클래스룸 API](https://developers.google.com/classroom)를 참고하세요.
- [구글클래스룸 API](https://developers.google.com/classroom)를 사용할 경우 https프로토콜로 **반드시** 전환해주세요. (보안 문제로 인해 토큰 uri가 작동하지 않을 수 있음)
- [다이얼로그플로우 API](https://cloud.google.com/dialogflow/docs)를 사용할 경우 **반드시** project Id와 private Key를 발급받아야합니다. project Isd를 발급받는 방법은 [다이얼로그플로우 API](https://cloud.google.com/dialogflow/docs)를 참고하세요. private Key를 발급받는 방법은 [구글 키 생성 및 관리](https://cloud.google.com/iam/docs/creating-managing-service-account-keys?hl=ko)를 참고하세요
## English
### How to install
#### Windows
1. Download and install this repository
1. Download and install the [node.js](https://nodejs.org/) installer(v7.6 or later). It must be installed with [npm](https://www.npmjs.com/)
1. Download and install the [MySQL](https://dev.mysql.com/downloads/windows/installer/8.0.html)installer(v5.0.0 or later)
1. Create a [config.js](#configjs) file in the `./private`
1. At the Commandline, type `npm install`
1. Run the command `npm start`
#### Linux
1. Download and install this repository
1. Install [node.js](https://nodejs.org/)(v7.6 or later) using package manager
1. Install [MySQL](https://dev.mysql.com/downloads/windows/installer/8.0.html)(v5.0.0 or later) using package manager 
1. Create a [config.js](#configjs) file in the `./private`
1. At the Shell, type `npm install`
1. Run the command `npm start`
#### Common
- Please create `aibee` database to access MySQL database server
- Please create [config.js](#configjs) file in the folder `./private`. This repertoire contains forms for [config.js](#configjs) file
- If you use [Google Classroom API](https://developers.google.com/classroom), you must obtain a client id. Please refer to the [Google Classroom API](https://developers.google.com/classroom) to issue a client ID.
- If you use [Google Classroom API](https://developers.google.com/classroom), please switch to https protocol. (Security issues may prevent token uri from working)
- If you use [Dialogflow API](https://cloud.google.com/dialogflow/docs), you must obtain a project Id and private Key. Please refer to the [Dialogflow API](https://cloud.google.com/dialogflow/docs) to issue a project ID. Please refer to the [create Google key and management](https://cloud.google.com/iam/docs/creating-managing-service-account-keys?hl=ko) to issue a private Key
# config.js
```js
module.exports={
    "secret": YOUR_SECRET_KEY,
    "host": YOUR_MYSQL_HOST,
    "user": YOUR_MYSQL_USER,
    "pw": YOUR_MYSQL_PASSWORD,
    "db":"aibee",
    "client_id": YOUR_GOOGLE_CLIENT_ID,
    "client_secret": YOUR_GOOGLE_CLIENT_SECRET_KEY,
    "project_id": YOUR_PROJECT_ID,
    "private_key": YOUR_PRIVATE_KEY,
    "client_email": YOUR_CLIENT_EMAIL
};
```