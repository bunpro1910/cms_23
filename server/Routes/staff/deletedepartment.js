

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {
    if(!req.body.id){
        res.json({isSussess:false,err:"required ID"})
    }
    let query1 = `update public.user set departmentid = '' where departmentid = '${req.body.id}'`
    let result1 = await connect(query1)
    let query = `delete from public.department where id = '${req.body.id}'`
    let result = await connect(query)
    if(result.rowCount>0){

        global.io.emit('reloadcate',{body:true})
        res.json({isSuccess:true})
    }else{
        res.json({isSuccess:false})
    }

}

module.exports = addtopic
