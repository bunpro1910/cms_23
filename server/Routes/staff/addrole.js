const { json } = require("body-parser")

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{

  const id = req.body.role.id
  const name = req.body.role.name
  
  if(!name){
    res.json({ isSuccess: false,err:"required name" })
    return
  }
  let query = `insert into public.role (name) values('${name}')`
  if(req.body.update){
     query = `update public.role set name = '${name}' where id = '${id}'`
  }

  let role = await connect(query)

  if(!role.rowCount){
    res.json({ isSuccess: false,err:"Some error when querry" })
    return
  }
  if (role.rowCount > 0) {

    res.json({ isSuccess: true })
    global.io.emit('reloadrole', { body: true })
  } else {
    res.json({ isSuccess: false })
  }
}

module.exports = addtopic
