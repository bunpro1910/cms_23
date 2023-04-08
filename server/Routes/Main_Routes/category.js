
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
    let query =`select * from public.category`
    if(req.query.id){
        query =`select * from public.category where id = '${req.query.id}'`
    }
    
    let category = await connect(query)

    if(category.rowCount>0){
        res.json({category:category.rows,quantity:category.rowCount})
    }else{
        res.json({category:"don't have any idea",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic