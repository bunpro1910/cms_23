
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
    let query =`select * from public.department`
    if(req.query.id){
        query =`select * from public.department where id = '${req.query.id}'`
    }
    
    let department = await connect(query)
    
    if(department.rowCount>0){
        res.json({department:department.rows,quantity:department.rowCount})
    }else{
        res.json({department:"don't have any idea",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic