
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
    let query =`select a.password, d.id as departmentid, u.accountid, u.id,u.fullname,u.phone,u.email,d.name as department_name from public.user as u , public.department as d,public.account as a where d.id = u.departmentid and a.username = u.accountid`
    if(req.query.id){
        query =`select a.password,d.id as departmentid, u.accountid,u.id,u.fullname,u.phone,u.email,d.name as department_name from public.user as u , public.department as d,public.account as a where d.id = u.departmentid and u.id = '${req.query.id}' and a.username = u.accountid`
    }
    
    let user = await connect(query)

    if(user.rowCount>0){
        res.json({user:user.rows,quantity:user.rowCount})
    }else{
        res.json({user:"don't have any user",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic