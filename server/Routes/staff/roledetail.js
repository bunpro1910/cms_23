
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    if(!req.query.id){
        res.json({err:"required ID"})
    }
    let query =`select u.id as username,r.id,r.name from public.role as r, public.roledetail as rd, public.user as u where u.accountid= rd.account_id and rd.roleid = r.id and u.id = '${req.query.id}' order by r.id asc`

    
    let role = await connect(query)
    console.log(role)
    if(role.rowCount>0){
        res.json({role:role.rows,quantity:role.rowCount})
    }else{
        res.json({role:"don't have any role",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic