const { json } = require("body-parser")

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{

  const id = req.body.department.id
  const name = req.body.department.name
  if(!id){
    res.json({ isSuccess: false,err:"required id" })
    return
  } 
  if(!name){
    res.json({ isSuccess: false,err:"required name" })
    return
  }
  let query = `insert into public.department (id,name) values('${id}','${name}')`
  if(req.body.update){
     query = `update public.department set name = '${name}' where id = '${id}'`
  }
  if(req.body.oldid && req.body.oldid != id){
    query = `insert into public.department (id,name) values('${id}','${name}');
    update public.idea set departmentid = '${id}' where departmentid = '${req.body.oldid}';
    delete from public.department where id = '${req.body.oldid}'
    `
  }
  let department = await connect(query)
  if (req.body.oldid && req.body.oldid != id) {
    res.json({ isSuccess: true })
    global.io.emit('newtopic', { body: true })
    return
  }
  if(!department.rowCount){
    res.json({ isSuccess: false,err:"Some error when querry" })
    return
  }
  if (department.rowCount > 0) {

    res.json({ isSuccess: true })
    global.io.emit('reloadcate', { body: true })
  } else {

    res.json({ isSuccess: false, })

  }
}

module.exports = addtopic
