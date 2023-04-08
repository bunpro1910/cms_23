
const connect =require("../../database/connect")
const path = require('path')
let topic = async (req,res)=>{
 
    let query =`select *from public.department`
    let department = await connect(query)
    let query2 =`select u.departmentid from public.idea as i ,public.user as u where u.id =i.userid`
    let idea = await connect(query2)
    let arr = []
    department.rows.map((item,i)=>{
        let totalidea = 0
        idea.rows.filter((e)=>{if(e.departmentid == item.id){totalidea++}})
        arr.push({
            id:item.id,
            name:item.name,
            totalidea:totalidea
        })

    })

    console.log(arr)
    if(department.rowCount>0){
        res.json({department:arr,quantity:arr.length})
    }else{
        res.json({department:"don't have any idea",quantity:0})
    }
    
   
    
  


  
}

module.exports =topic