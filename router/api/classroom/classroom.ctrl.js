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
                'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
                'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
                'https://www.googleapis.com/auth/classroom.guardianlinks.students',
                'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
                'https://www.googleapis.com/auth/classroom.profile.emails',
                'https://www.googleapis.com/auth/classroom.profile.photos',
                'https://www.googleapis.com/auth/classroom.push-notifications',
                'https://www.googleapis.com/auth/classroom.rosters',
                'https://www.googleapis.com/auth/classroom.rosters.readonly',
                'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
                'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
                'https://www.googleapis.com/auth/classroom.topics',
                'https://www.googleapis.com/auth/classroom.topics.readonly'
            ]
    });
    res.send(authUrl);
}
exports.getToken=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);

    const p=new Promise((resolve,reject)=>{
        oAuth2Client.getToken(req.body.code,(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        });
    });
    const respond=(docs)=>{
        res.status(200).json({
            "access_token":docs.access_token,
            "refresh_token":docs.refresh_token
        });
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
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
    
    const classroom=google.classroom({version: 'v1',auth: oAuth2Client});
    const p=new Promise((resolve,reject)=>{
        classroom.courses.list((err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        });
    });
    const respond=(docs)=>{
        let classlist=[];
        let classid=[];
        if(docs.data.courses&&docs.data.courses.length){
            docs.data.courses.forEach((course)=>{
                classlist.push(course.name);
                classid.push(course.id)
            });
            res.status(200).json({
                "classlist": classlist,
                "classid": classid
            });
        }else{
            res.status(200).json({
                message: "empty class"
            });
        }
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
}
exports.getWork=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);

    const token={
        "access_token":req.body.access_token,
        "courseId":req.body.classid
    };

    oAuth2Client.setCredentials(token);
    
    const classroom=google.classroom({version: 'v1',auth: oAuth2Client});
    const p=new Promise((resolve,reject)=>{
        classroom.courses.courseWork.list(token,(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        });
    });
    const respond=(docs)=>{
        res.status(200).json({
            "docs": docs.data
        });
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
}
exports.getStudents=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);

    const token={
        "access_token":req.body.access_token,
        "courseId":req.body.classid
    };

    oAuth2Client.setCredentials(token);
    
    const classroom=google.classroom({version: 'v1',auth: oAuth2Client});
    const p=new Promise((resolve,reject)=>{
        classroom.courses.students.list(token,(err,docs)=>{
            if(err) reject(err);
            resolve(docs);
        });
    });
    const respond=(docs)=>{
        res.status(200).json({
            "docs": docs.data
        });
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
}