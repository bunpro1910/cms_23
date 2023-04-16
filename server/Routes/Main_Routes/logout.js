
const path = require('path')
let logout =(req,res)=>{
    req.session =null
    res.json({isSuccess:true})
    setTimeout(()=>{
        global.io.emit('authentication',{body:true})
    },500)
   
}

module.exports =logout