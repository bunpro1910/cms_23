const { json } = require("body-parser")

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{

  const id = req.body.category.id
  const name = req.body.category.name
  if(!id){
    res.json({ isSuccess: false,err:"required id" })
    return
  } 
  if(!name){
    res.json({ isSuccess: false,err:"required name" })
    return
  }
  let query = `insert into public.category (id,name) values('${id}','${name}')`
  if(req.body.update){
     query = `update public.category set name = '${name}' where id = '${id}'`
  }
  if(req.body.oldid && req.body.oldid != id){
    query = `insert into public.category (id,name) values('${id}','${name}');
    update public.idea set categoryid = '${id}' where categoryid = '${req.body.oldid}';
    delete from public.category where id = '${req.body.oldid}'
    `
  }
  let category = await connect(query)
  if (req.body.oldid && req.body.oldid != id) {
    res.json({ isSuccess: true })
    global.io.emit('newtopic', { body: true })
    return
  }
  if(!category.rowCount){
    res.json({ isSuccess: false,err:"Some error when querry" })
    return
  }
  if (category.rowCount > 0) {

    res.json({ isSuccess: true })
    global.io.emit('reloadcate', { body: true })
  } else {

    res.json({ isSuccess: false })

  }
}

module.exports = addtopic
