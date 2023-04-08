

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
  let err = ''
  console.log(req.body)
  if(!req.body.comment) err +='required text \n'

  const query = `select * from public.react where userid = '${req.session.user.id}' and ideaid =${req.query.ideaid}`

  let queryinsert
  let react = await connect(query)

  if(react.rowCount>0){
    if(react.rows[0].react == req.query.react){
        let querydelete =`delete from public.react  where userid = '${req.session.user.id}' and ideaid =${req.query.ideaid}`
        let result = await connect(querydelete)

        if(result.rowCount>0){
            res.json({isSuccess:true})
            global.io.emit('reloadreact',{body:true})
          }else{
        
            res.json({isSuccess:false})
        
          }
        return
      }
    queryinsert = `update public.react set react = ${req.query.react} where userid = '${req.session.user.id}' and ideaid =${req.query.ideaid}`
  }else{
    queryinsert = `insert into public.react (userid,ideaid,react) values ('${req.session.user.id}',${req.query.ideaid},${req.query.react})`
  }
  let result = await connect(queryinsert)

  if(result.rowCount>0){
    res.json({isSuccess:true})
    global.io.emit('reloadreact',{body:true})
  }else{

    res.json({isSuccess:false})

  }
}

module.exports = addtopic
