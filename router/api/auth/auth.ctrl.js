const jwt=require('jsonwebtoken');
const {User}=require('../../../models');

exports.getData=async(req,res)=>{
    const token=req.headers['x-access-token']||req.query.token;
    if(!token) res.send({message:"token is not unvalued"});
    const json=jwt.verify(token,req.app.get('jwt-secret'));
    res.status(200).send(json);
}
exports.login=async(req,res)=>{
    const secret=req.app.get('jwt-secret');
    let docs=await User.findAll({
        where:{email:req.body.email}
    });
    if(docs.length>0){
        const token=await jwt.sign(docs[0].dataValues,secret);
        res.status(201).send({"x-access-token": token});
    } else{
        docs=await User.create({email:req.body.email});
        const token=await jwt.sign({
            email: docs.dataValues.email,
            s_type: null,
            s_region: null,
            s_name: null,
            access_token: null,
            refresh_toke: null
        },secret);
        res.status(201).send({"x-access-token": token});
    }
}
exports.updateData1=async(req,res)=>{
    const update=await User.update({
        s_type: req.body.type,
        s_region: req.body.region,
        s_name: req.body.name
    },{where: {email:req.body.email}});
    const status=update[0]===0?204:201;
    const docs=await User.findAll({where:{email:req.body.email}});
    const secret=req.app.get('jwt-secret');
    const token=await jwt.sign({
        email: req.body.email,
        type: req.body.type,
        region: req.body.region,
        name: req.body.name,
        access_token: docs[0].dataValues.access_token,
        refresh_token: docs[0].dataValues.refresh_token
    },secret);
    res.status(status).send({"x-access-token": token});
}
exports.updateData2=async(req,res)=>{
    await User.update(req.body,{where: {email:req.body.email}});
    const secret=req.app.get('jwt-secret');
    const token=await jwt.sign(req.body,secret);
    res.status(201).send({"x-access-token": token});
}