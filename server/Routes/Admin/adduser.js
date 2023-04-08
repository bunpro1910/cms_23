const { json } = require("body-parser")
const e = require("express")

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {

    const fullname = req.body.user.fullname
    const email = req.body.user.email
    const account_id = req.body.user.account_id
    const departmentid = req.body.user.departmentid
    const phone = req.body.user.phone
    const password = req.body.user.password

    let err= ""
    if(!fullname){
        err+= "required full name, "
    }
    if(!email){
        err+= "required email, "
    }
    if(!account_id){
        err+= "required account_id, "
    }
    if(!departmentid){
        err+= "required departmentid, "
    }
    if(!phone){
        err+= "required phone, "
    }
    if(!password){
        err+= "required password, "
    }
    if(err!=''){
        res.json({isSuccess:false,message:err})
        return
    }
 
    let query = `
    
    insert into public.account values('${account_id}','${password}');
    insert into public.user (fullname,email,accountid,id,phone,departmentid) values('${fullname}','${email}','${account_id}','${account_id}','${phone}','${departmentid}');
    insert into public.roledetail (roleid,account_id) values(3,'${account_id}')
    
    `
    if (req.body.update) {
        query = `update public.user set fullname = '${fullname}',email = '${email}',phone = '${phone}',departmentid = '${departmentid}' where accountid = '${account_id}';
        update public.account set password = '${password}' where username = '${account_id}'
        `
    }
   
    let account = await connect(query)
    let isSuccess = true
    account.map((item,i)=>{
        if(!item.rowCount){
            isSuccess = false
        }
    })
    res.json({isSuccess: isSuccess})
}

module.exports = addtopic
