
const connect = require("../../database/connect")
const path = require('path')
let topic = async (req, res) => {

    if (!req.body.id) {
        res.json({ err: "required ID" })
        return
    }
    if (!req.body.userid) {
        res.json({ err: "required user ID " })
        return
    }
    let query = `delete from public.roledetail where account_id = '${req.body.userid}' and roleid  = ${req.body.id}`
    console.log(query)
   
    let result = await connect(query)
    if(result.rowCount>0){
        res.json({ isSuccess:true })
        global.io.emit('reloaduserrole', { body: true })
    }else{
        res.json({ isSuccess:false })
    }





}

module.exports = topic