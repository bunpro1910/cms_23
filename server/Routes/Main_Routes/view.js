
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
    if(!req.query.id){
        res.json({err:"don't have any id"})
        return
    }
    let query =`select * from public.view  where ideaid = ${req.query.id} order by visittime asc`

    let view = await connect(query)
    if(view.rowCount>0){
        res.json({view:view.rows, quantity:view.rowCount})
    }else{
        res.json({view:"don't have any view",quantity:0})
    }
    
}

module.exports =topic