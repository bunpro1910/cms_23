

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {
    let err = ''
    if(!req.query.id){
        res.json({isSuccess:false})
        return
    }
    let date = new Date()/ 1000.0
    let query = `insert into public.view (visittime,userid,ideaid) values (to_timestamp(${date}),'${req.session.user.id}',${req.query.id})`
    let result = await connect(query)
    if(result.rowCount>0){
        res.json({isSuccess:true})
        global.io.emit('reloadcount',{body:true})
    }else{
        res.json({isSuccess:false})
    }

}

module.exports = addtopic
