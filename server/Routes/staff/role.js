
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
    let query =`select * from public.role`
    if(req.query.id){
        query =`select * from public.role where id = '${req.query.id}'`
    }
    
    let role = await connect(query)

    if(role.rowCount>0){
        res.json({role:role.rows,quantity:role.rowCount})
    }else{
        res.json({role:"don't have any role",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic