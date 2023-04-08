
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    let query =`select * from public.topic order by id desc`
    if(req.query.id){
         query =`select * from public.topic where id ='${req.query.id}' order by id desc`
    }
    let topic = await connect(query)
    if(topic.rowCount>0){
        res.json({topic:topic.rows,quantity:topic.rowCount})
    }else{
        res.json({topic:"don't have any topic",quantity:0})
    }
    

    
  


  
}

module.exports =topic