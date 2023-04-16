
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    if(!req.query.id){
        res.json({err:"don't have any id"})
        return
    }
    let query =`select  c.name as categoryname,i.brief,i.title, u.fullname, i.id ,i.text, i.filepath, i.datetime from public.idea as i, public.user as u ,public.category as c  where c.id=i.categoryid and i.topicid = '${req.query.id}' and u.id= i.userid  order by i.id desc`

    let arr =[]

    let idea = await connect(query)
    let page =1;
    idea.rows.map((item,i)=>{
        arr.push({...item,page:page})
        if((i+1)%5==0){
            page++
        }
    
    })



    if(idea.rowCount>0){
        res.json({idea:arr,quantity:idea.rowCount})
    }else{
        res.json({idea:"don't have any idea",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic