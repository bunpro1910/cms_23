
const path = require('path')
let logout =(req,res)=>{
    req.session =null
    res.json({isSuccess:true})
    global.io.emit('authentication',{body:true})
}

module.exports =logout