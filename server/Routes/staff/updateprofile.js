
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
   
    const fullname = req.body.fullname
    const gmail = req.body.email
    const phone = req.body.phone
    const id = req.body.id
    if(!id) {
        res.json({isSuccess:false,message:`required id`})
        return
    }
    if(!fullname) {
        res.json({isSuccess:false,message:`required full name`})
        return
    }
    
    if(!gmail) {
        res.json({isSuccess:false,message:`required gmail`})
        return
    }
    if(!phone) {
        res.json({isSuccess:false,message:`required phone`})
        return
    }
    let query =`update public.user set fullname = '${fullname}', email = '${gmail}',phone ='${phone}' where id = '${id}'`
   
    let result = await connect(query)
    if(result.rowCount > 0){

        req.session.user =req.body
        res.json({isSuccess:true,message:`Update successfully`})
        global.io.emit('authentication',{body:true})
    }else{
        res.json({isSuccess:false,message:`Update Failed`})
    }


  
}

module.exports =topic