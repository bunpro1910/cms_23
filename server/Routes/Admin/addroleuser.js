
const connect = require("../../database/connect")
const path = require('path')
let topic = async (req, res) => {
    console.log(req.body)
    if (!req.body.id) {
        res.json({ err: "required ID" })
        return
    }
    if (!req.body.userid) {
        res.json({ err: "required user ID " })
        return
    }
    let query = `insert into public.roledetail (account_id,roleid) select '${req.body.userid}',${req.body.id} where not EXISTS (select * from public.roledetail where account_id = '${req.body.userid}' and roleid = ${req.body.id} )     `
   
    let result = await connect(query)
    if(result.rowCount>0){
        res.json({ isSuccess:true })
        global.io.emit('reloaduserrole', { body: true })
    }else{
        res.json({ isSuccess:false })
    }





}

module.exports = topic