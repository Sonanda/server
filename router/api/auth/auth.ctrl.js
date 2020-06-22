const jwt=require('jsonwebtoken');

exports.generate=(req,res)=>{
    const secret=req.app.get('jwt-secret')
    const p=new Promise((resolve,reject)=>{
        jwt.sign(
            req.body, 
            secret, 
            {
                expiresIn:'7d',
                issuer:'velopert.com',
                subject:'userInfo'
            },(err,token)=>{
                if(err) reject(err);
                resolve(token);
            }
        );
    });
    const respond=(token)=>{
        res.status(200).json({
            token
        });
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
}
exports.compare=(req,res)=>{
    const token=req.headers['x-access-token']||req.body.token;

    if(!token){
        return res.status(403).json({
            message:'token is not unvalued'
        });
    }
    const p=new Promise((resolve,reject)=>{
        jwt.verify(token,req.app.get('jwt-secret'),(err, decoded)=>{
            if(err) reject(err);
            resolve(decoded);
        });
    });
    const respond=(token)=>{
        res.status(200).json({
            info:token
        });
    };
    const error=(error)=>{
        res.status(403).json({
            message:error.message
        });
    };
    p.then(respond).catch(error);
}