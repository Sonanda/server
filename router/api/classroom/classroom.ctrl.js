const {google} = require('googleapis');

exports.getLink=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        scope:
            [
                'https://www.googleapis.com/auth/classroom.announcements',
                'https://www.googleapis.com/auth/classroom.announcements.readonly',
                'https://www.googleapis.com/auth/classroom.courses',
                'https://www.googleapis.com/auth/classroom.courses.readonly',
                'https://www.googleapis.com/auth/classroom.coursework.me',
                'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
                'https://www.googleapis.com/auth/classroom.coursework.students',
                'https://www.googleapis.com/auth/classroom.coursework.students.readonly'
            ]
    });
    res.status(200).send({link:authUrl});
}
exports.getToken=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);
    try{
        const docs=await oAuth2Client.getToken(req.body.code);
        console.log({
            "access_token":docs.tokens.access_token,
            "refresh_token":docs.tokens.refresh_token
        });
        res.status(200).send({
            "access_token":docs.tokens.access_token,
            "refresh_token":docs.tokens.refresh_token
        });
    }catch(e){
        res.status(403).send({
            message: e.message
        });
    }
}
exports.getClass=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);
    const token={
        "access_token":req.body.access_token,
        "refresh_token":req.body.refresh_token
    };

    oAuth2Client.setCredentials(token);

    try{
        const classroom=google.classroom({version: 'v1',auth: oAuth2Client});
        const docs=await classroom.courses.list();
        let classlist=[];
        let classid=[];
        if(docs.data.courses&&docs.data.courses.length>0){
            docs.data.courses.forEach((course)=>{
                classlist.push(course.name);
                classid.push(course.id)
            });
            res.status(200).json({
                "classlist": classlist,
                "classid": classid
            });
        }else{
            res.status(200).send({message: "empty class"});
        }
    }catch(e){
        res.status(403).send({
            message: e.message
        });
    }
}
exports.getWork=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);
    const token={
        "access_token": req.body.access_token,
        "refresh_token": req.body.refresh_token
    };
    oAuth2Client.setCredentials(token);
    const classroom=google.classroom({version: 'v1',auth: oAuth2Client});
    try{
        const docs=await classroom.courses.courseWork.list({"courseId": req.body.classid});
        res.status(200).send(docs.data);
    }catch(e){
        res.status(403).send({message: e.message});
    }
}