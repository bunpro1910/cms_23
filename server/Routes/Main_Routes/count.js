
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    if(!req.query.id){
        res.json({err:"don't have any id"})
        return
    }

    let query =`select  i.id,COUNT(c.id)  from public.topic as t, public.comment as c,public.idea as i where t.id = '${req.query.id}' and i.topicid = t.id and c.ideaid = i.id group by i.id order by i.id desc;`

    let query1 =`select  i.id,COUNT(v.id)  from public.topic as t, public.view as v,public.idea as i where t.id='${req.query.id}' and i.topicid= t.id and v.ideaid= i.id group by i.id order by i.id desc;`
    let totalcomment = await connect(query)
    let totalview = await connect(query1)
    console.log(totalcomment,totalview)
    if(totalcomment.rowCount>0 ||totalview.rowCount>0 ){
        res.json({totalcomment:totalcomment.rows,totalview:totalview.rows})
    }else{
        res.json({count:0,quantity:0})
    }
    
}

module.exports =topic