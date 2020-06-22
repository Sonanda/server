const {google} = require('googleapis');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');

exports.getLink=async(req,res)=>{
    const client_secret=req.app.get('client_secret');
    const client_id=req.app.get('client_id');
    const redirect_uri="urn:ietf:wg:oauth:2.0:oob";
    const oAuth2Client=await new google.auth.OAuth2(client_id,client_secret,redirect_uri);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
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
    res.send(`https://accounts.google.com/signin/oauth/consentsummary?authuser=${req.body.auther}&part=AJi8hAOb-U9dtXnrRI5Y2fNvhrwonx9aY7CSIMSJ_Rxwj9_HNHDgKruOScZ4w23MXq3GOa48l5cOBgjgTyGYjB8ma8hLRKuwPQj1H4UiMLjjve-xEwMFx0Jgis-sdKpO5r1zNNc4JZbImUAH9ItbsIvySAPiXkH4HhjMxK8GyW9TV_37-coepy6-lgQ7c51nzOPjbD4EEOXzwSR0iGJ7ozujAVg2lJB_nUUmch457Wbz3FPKNFFPEjDldQ-fQRUCGCyIgWsS-hkNreJqwi3Kwll16hqmf_voqPIouq3fVBFuxX0OVBRk3LxWmm97esFPzXKahXxJ9C_IAyOKa8SrL4eDE2g-ImgFt3I1M3lolXN6yBa6AWAK9T-dDEeoHD88MVy9RqwWKnQQXohCCvy_6k_C9o4gNdjy44Jyv0YdWnvipX_wVzw6PYU3LJsRPhNsD_fiFhqthy28K7Bpc3dLyVRaYe1Gx4pkBZz6dma2O2xsHGXEFXkoOiuaXbkZQ12gWdMbj_JXme5GpotNgtYyrmxGKShWfhKRpq-wgeRkP5UkZc85pzjVsKGAiG2uSzW1Y7xHeQnvIZUdVOZsagV-0TwpqcckHVpsWLEqfwfz8PE_m_O6zz8Wl4nVHLY02ZUoC2_egedjU0Xnz98fMH33DhN5wEZkp25iU2bzDvPYWR1_8pLkEPDDl41OdbY6pSqCcMmKbiL-ibvXy81YlZXWDz2ZP0TIT1Ek41p8Tib0iL1i_B-4UP6uwx7Ybe_Tlv-w4_mfDZHeGbfXUIq5KlYQC-Mlmogk9BRKitECRPr-yzR0fPfu_6FPcyF_oEBbDLm9tjatvt9idnCg6tzdA3ziZxQvIiQynnVelUvepQFOtC75C9vRPLMEdxD1OKebVogt73-D6XNTfbLgTMiKFNkrDdTXJKQZBJGbMaaoyJI9BRPZmRxzMQ3QCxm1Rn5bMAJcvyYXONwpLhPaq6z_e4VXmLKaYCmUqFWs73B6ec7bGaJwAOlJMm3ToGRb5Cj6ets6VoTlyczr6G4e4hDxZ_hd_xxFBfMzWO7n7DOYzFxRI-uLMAtym62oWgKQkO_5lqliwTUXX55jfia6LUJWe33aIP8qnUwhiA6o2VhQNBT5IV9o0ATUZxBtvY84WJnrCDcyTyW7BQCeqRbkVPYJ4ua6Re_IkJ9_glMBHxDggwgZB4Dr_jWzexcVUIIiSh_JzEsWSQte07_A2FJnPmBOXgaLD6KFw_FsMXWEuXxvmziz5WCp6QdEmg2A_wT2uxhl4O_UWKo1ztRhDYCZXsHXxFK0CuwB4s7EWGwHLgHy3njyDsgTt4Dc1edSPX3Kozr5bN7Q0CGAK6w6UPRhxZWahHh5q74z6fzNRulWpV31s4EyzldHoZjEdAv8zUWs_AbymnMUtIbcOwQ0M2aTnNt4d4hp7ThVfGuM9e_w7k3ITUiip5-XBmtGUCo2Gr7gP3zrgJP18i0_4hblMpV-_iEWmYL1QgJ60iZ4GcMVGBQ5KATFa7I0eSvvqedc3BAw_SeV4eAE9mI8WnNSGUfgTqjljQ_WPWAJKHbosNiWsT9R6eAIaLIC7OMvN5wCz1lr70AnRl5wRZvV_5zukKXCH3Ub2ARUrGUfaBGWZvXqxmjunnICZ4h1_pe3OyyoiakvxKG2L-2bgC0ZemP53oZWb8w_MzI5BlJ15OlaODsh11P05ZQf6CX0b-Sx7ftPgP9VqvsfIrmYmPzwnIJeaCcqpczca7k5tygyvk5uH0jZbFEautFoY02o0WwpJdRzCZCEsPdYf-MT4RVsCXcVLRZy73aDmfVyvi4G717VZdmNC15Ta15q7GIDXj_HcOMoTe2xpt-W-xAR9NyjCdK3VhoHZRIA_80PsSzTYbx_LOZSgAv5zkiZ3PYtsyAYAKZBYoRbEqJbC6AQOi0Q1n5sL7oAdMCGeY3anJR-ZyfZpMKwzidGIYJdwqlYx7584yO67oj4Thrfg32DyRBjsY4oUcUflbpCVLIDXOm_SFA9W2Sr4AMNABiUJrf1rXpBHzZY4nRl-PuEpKYCbMqveJ47PpHZNZDjqNU8TMYNzOz96MkUh_ScwYpnf2laZMfoZS95JJBgM7Fjhfqdv9grOG4YPs4mIDCC9yIi7dQaE3BQf99bCjGs2vB07KXZc3FBlddPOiyLMi-jjE0tQxqOgTWY62MA37JNll16XpdYWT-cA9zw9ZmBYbJFG7ydbWT9dYLgoiQNReskvrs1e69skjhq6zeHkr9nGemHYSolPgCkeQH_zPHPj7Jfc4RNN5TtyGFfV6pP_U_9nA7nVBRv_VZ9D75MgL4V6aoIGApXLUEP0_3xile5mR98FUj4pCgSquzYuzQRhFsD_W6WBDq4zuJPNBBwzK7Ap9nMVtsoPy1K0OnDFQFCtdHLODsTH6EbssWywnZtZmO5Trg2kGw5QQe2Agnzqqu-JYqvyvozNGlF9NM_YPCeCdoTRWIvjSokkk4nbR7zvBooCtLdqfGf0pyVbt8FDDm_ursYcqhC4HnBAPCbsw0xkK9EWY_ADiq_Jw58j5m6ObjN4Hy6qRj1JTLA4eLOAem6-hgRgvI3mFzZJXkmtTsTtbxbpSkMJQRyPAsPGCJkWFuR7HJp1dXSkWYa0wVbhgQDgAKBpJCC24hQPmaw1cPQM5dryZxc4-zLs8NxBuERrDpmNV7Fr386hhxIKFObVwweBkAptqiLhxSVOA4qMhWFhOmU0VzbRTYYjGQPNch-OomN4uuYZW2HL-xQsMrkrQz-pfliw-zo5pMc8miodFC8WB3r3btvANCGV-03EolYrGSreAnKWBIlhIecCxSCxbv734CjRPgRH4_PmIJr9jWLEs7-aWyOpJbMzAMCx8-4B0j330ePQvlV65xKiigjbe6Of7aUzJ-F0EO6uIgDJs6hIHfhIab-FF1r4ylEBJ897ESlgGsUEsvjGsGpKvWvCJCkWQ0SMgkTP5UQS1bsaqtjv1W6Yit7GdZ0BKyfaGibUw55AGVctdQtmwuQIhYDgcok_RvrL38mmvs4eCpO1ixrmjDscP5x6tDRKcbP2-_p-UwLbUYD-ZkMd2Ch8HVZ2-_UJKjBjCvNUttS_u8ssmsWeWC1YJNYdTh-67JS7ST9CYJfGp2nyafQ1CK5RbwsNmTH3AJiIrBcF1IedU1BNMKqUtiT7AJunbgA8qi0BBeby20906WCz5SNc2-_I00uOp9eS_MmsLOSs4ble9dDZsPlvCB7HiOsYANapxotQdb08vBVlgEx10iqyg4SeHKDXrCvzxRKNRscNrGlc0Trc3fZmMxziraJHX7j4sK-Pf1TzZBIk8kWgwl_IqN7QyPwFq3RePQFKH704XRJV4o5wZiXQneCwOsy7fgTHfm1it6PtgLEDgpKHBH8tgGCNjiZTuqeZg7pRLYgbmHIO58nCuLvcRqGqANkAk3pzFc6Fn8pYuTuhPuhWaK9M4qPzhrgQZVXdw3Da8aNONxWXwuKNudtXDTlhUSe-V_vhkaWQsxbCoBmJztBsyXg7iTBZxMxJSZHn_8f2iG4b8ovRTOkLy02b75rohimhSGYbE9sjOk_2W99TBqlfidTz6dgryO54SbrNciEBK_FTcb0QuBAFyQ2yVZdcCOt1EirCDqr-DYj3uBws9YcUHonapiuPLMnrYt43O-YSAx7SU5q2bTxOnHtdA3Mzq-LOWPbkVupHhDODjISeSJDIQKwDnkhmgXIhSA1t5FdW4yftxWbeAeAeWAqgCgg_TVWzeoeyVch9hf48jCER2CFp2PEXr7yj9Ljxp0_umzUKekVhlxACLZhEw&hl=ko&as=dsFcDnx8m_cDTwQMvCvVog&approvedScope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.topics.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.topics+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.announcements.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.announcements+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.push-notifications+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.guardianlinks.me.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.guardianlinks.students.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.guardianlinks.students+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.coursework.students+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.coursework.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.student-submissions.students.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.student-submissions.me.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.profile.emails+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.profile.photos+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.rosters.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.rosters+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.courses.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fclassroom.courses&pli=1&rapt=AEjHL4PN4hSSaZ7sixqSBMop7J0FzonexutRu3K-jIFHZBvenlHDcRcSNnHcpsn1c6FhxpJb14vnMB_wTBxWHFic5GK_TTpKyA`);
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
            "docs": docs
        });
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
}