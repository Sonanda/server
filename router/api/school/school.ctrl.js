const schoolapi=require('school-kr');
const school=new schoolapi();

exports.getMeal=async(req,res)=>{
    const type=eval('schoolapi.Type.'+req.body.type);
    const region=eval('schoolapi.Region.'+req.body.region);
    const schoolname=req.body.school;

    const result = await school.search(region,schoolname);
    school.init(type,region,result[0].schoolCode);
    
    const meals=await school.getMeal(req.body.year,req.body.month);

    delete meals.year;
    delete meals.month;
    delete meals.day;
    delete meals.today;

    for(let i in meals) {
        meals[i]=jsonifyMeal(meals[i]);
    }
    if (req.body.day) {
        req.body=meals[req.body.day];
    } else {
        req.body=meals;
    }

    res.send(req.body);
}
exports.getSchedule=async(req,res)=>{
    const type=eval('schoolapi.Type.'+req.body.type);
    const region=eval('schoolapi.Region.'+req.body.region);
    const schoolname=req.body.school;
    const year=req.body.year;
    const month=req.body.month.toString().padStart(2,'0');

    const result=await school.search(region,schoolname);
    school.init(type,region,result[0].schoolCode);

    const calendar=await school.getCalendar(year,month);

    delete calendar.year;
    delete calendar.month;

    if(req.body.day){
        req.body={"today":calendar[req.body.day]};
    }else{
        req.body=calendar;
    }
    res.send(req.body);
}
let jsonifyMeal=meal=>{
    const menus=meal.replace(/\n/g,',').replace(/[1234567890*./]/gi,'').split(',');
  
    const breakfastIndex=menus.indexOf('[조식]')===-1?menus.length:menus.indexOf('[조식]');
    const lunchIndex=menus.indexOf('[중식]')===-1?menus.length:menus.indexOf('[중식]');
    const dinnerIndex=menus.indexOf('[석식]')===-1?menus.length:menus.indexOf('[석식]');
  
    return {
        조식:menus.slice(breakfastIndex+1,lunchIndex),
        중식:menus.slice(lunchIndex+1,dinnerIndex),
        석식:menus.slice(dinnerIndex+1)
    };
}