

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {
    if(!req.body.id){
        res.json({isSussess:false,err:"required ID"})
    }
    let idea = `select * from public.idea where topicid= '${req.body.id}'`
    let ideaarr = await connect(idea)
    let query1 =''
    ideaarr.rows.map((item,i)=>{
        query1 +=`delete from public.view where ideaid=${item.id};`
        query1 += `delete from public.react where ideaid=${item.id};`
    })
    if(query1!=''){
        let result1 = await connect(query1)
    }
    let query3 = `delete from public.idea where topicid='${req.body.id}'`
    let query4 = `delete from public.topic where id='${req.body.id}'`
    let result3 = await connect(query3)
    let result4 = await connect(query4)
    global.io.emit('reloadtopic',{body:true})
    res.json({isSuccess:true})
}

module.exports = addtopic
