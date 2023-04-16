
const connect =require("../../database/connect")
const path = require('path')
let handlelogin = async (req,res)=>{
    let query =`select * from public.account where lower (username) = lower('${req.body.username}') and password = '${req.body.password}'`

    
    let account = await connect(query)
    if(account.rowCount >0){
        
            let query1 = `select u.id,r.name as rolename ,u.fullname,u.email,u.departmentid,u.phone from public.user as u, public.roledetail as rd, public.role as r where u.accountid = '${req.body.username}' and rd.account_id = u.accountid and rd.roleid = r.id`
            let user = await connect(query1)     
            console.log(user)
            if(user.rows.find(e=> e.rolename =="Admin")){
                user.rows[0] ={...user.rows[0],isAdmin:true}
            }

            if(user.rows.find(e=> e.rolename =="QA manager")){
                user.rows[0] ={...user.rows[0],isQA:true}
            }
            req.session.user =user.rows[0]
            res.json({isSucess:true})

            setTimeout(()=>{
                global.io.emit('authentication',{body:true})
            },500)
          
        return
    }else{
        res.json({isSucess:false,message:"User ID or password not match"})
    }
    
    
    
  


  
}

module.exports =handlelogin