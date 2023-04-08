
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    if(!req.query.id){
        res.json({err:"don't have any id"})
        return
    }
    let query =`select * from public.comment  where ideaid = ${req.query.id} order by datetime asc`

    
    let comment = await connect(query)
    if(comment.rowCount>0){
        res.json({comment:comment.rows, quantity:comment.rowCount})
    }else{
        res.json({comment:"don't have any comment",quantity:0})
    }
    
}

module.exports =topic