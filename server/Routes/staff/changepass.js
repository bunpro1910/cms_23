
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
   
    const oldpass = req.body.oldpass
    const id = req.body.id
    const newpass = req.body.newpass
    const confirmpass = req.body.confirmpass
    if(!oldpass) {
        res.json({isSuccess:false,message:`required oldpass`})
        return
    }
    if(!id) {
        res.json({isSuccess:false,message:`required id`})
        return
    }
    
    if(!newpass) {
        res.json({isSuccess:false,message:`required newpass`})
        return
    }
    if(!confirmpass) {
        res.json({isSuccess:false,message:`required confirmpass`})
        return
    }
    if(newpass!=confirmpass) {
        res.json({isSuccess:false,message:`New pass and confirmpass not same`})
        return
    }
    let query1 =`select * from public.account where username = '${id}' and password ='${oldpass}'`
   
    let result1 = await connect(query1)
    if(result1.rowCount==0){
        res.json({isSuccess:false,message:`Update Failed old message not match`})
        return
    }
    let query =`update public.account set password = '${newpass}' where username = '${id}'`
   
    let result = await connect(query)
    if(result.rowCount > 0){
        res.json({isSuccess:true,message:`Update successfully`})
    }else{
        res.json({isSuccess:false,message:`Update Failed`})
    }


  
}

module.exports =topic