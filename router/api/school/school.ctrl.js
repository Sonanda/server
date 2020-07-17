const schoolapi=require('school-kr');
const school=new schoolapi();

exports.getMeal=async(req,res)=>{
    req=convertSchool(req);

    const type=eval('schoolapi.Type.'+req.query.type);
    const region=eval('schoolapi.Region.'+req.query.region);
    const schoolname=req.query.school;

    const result = await school.search(region,schoolname);
    school.init(type,region,result[0].schoolCode);
    
    const meals=await school.getMeal(req.query.year,req.query.month);
    
    delete meals.year;
    delete meals.month;
    delete meals.day;
    delete meals.today;

    for(const i in meals) {
        const menus=meals[i].replace(/\n/g,',').replace(/[1234567890*./]/gi,'').split(',');
        const breakfastIndex=menus.indexOf('[조식]')===-1?menus.length:menus.indexOf('[조식]');
        const lunchIndex=menus.indexOf('[중식]')===-1?menus.length:menus.indexOf('[중식]');
        const dinnerIndex=menus.indexOf('[석식]')===-1?menus.length:menus.indexOf('[석식]');
        meals[i]={
            조식:menus.slice(breakfastIndex+1,lunchIndex),
            중식:menus.slice(lunchIndex+1,dinnerIndex),
            석식:menus.slice(dinnerIndex+1)
        };
    }
    if (req.query.day) {
        req.query=meals[req.query.day];
    } else {
        req.query=meals;
    }

    res.status(200).send(req.query);
}
exports.getSchedule=async(req,res)=>{
    req=convertSchool(req);

    const type=eval('schoolapi.Type.'+req.query.type);
    const region=eval('schoolapi.Region.'+req.query.region);
    const schoolname=req.query.school;
    const year=req.query.year;
    const month=req.query.month.toString().padStart(2,'0');

    const result=await school.search(region,schoolname);
    school.init(type,region,result[0].schoolCode);

    const calendar=await school.getCalendar(year,month);

    delete calendar.year;
    delete calendar.month;

    if(req.query.day){
        req.query={"today":calendar[req.query.day]};
    }else{
        req.query=calendar;
    }
    res.status(200).send(req.query);
}
const convertSchool=req=>{
    let region=req.query.region;
    let type=req.query.type;

    if(type==="초등학교") type="ELEMENTARY";
    else if(type==="중학교") type="MIDDLE";
    else if(type==="고등학교") type="HIGH";
    else if(type==="특성화고등학교") type="HIGH";
    else if(type==="특수목적고등학교") type="HIGH";
    else if(type==="자율고등학교") type="HIGH";

    if(region==="서울특별시") region="SEOUL";
    else if(region==="부산광역시") region="BUSAN";
    else if(region==="인천광역시") region="INCHEON";
    else if(region==="대구광역시") region="DEAGU";
    else if(region==="광주광역시") region="GWANGJU";
    else if(region==="대전광역시") region="DAEJEON";
    else if(region==="울산광역시") region="ULSAN";
    else if(region==="세종특별자치시") region="SEJONG";
    else if(region==="경기도") region="GYEONGGI";
    else if(region==="강원도") region="KANGWON";
    else if(region==="충청남도") region="CHUNGNAM";
    else if(region==="충청북도") region="CHUNGBUK";
    else if(region==="경상북도") region="GYEONGBUK";
    else if(region==="경상남도") region="GYEONGNAM";
    else if(region==="전라북도") region="JEONBUK";
    else if(region==="전라남도") region="JEONNAM";
    else if(region==="제주특별자치도") region="JEJU";

    req.query.type=type;
    req.query.region=region;

    return req;
}