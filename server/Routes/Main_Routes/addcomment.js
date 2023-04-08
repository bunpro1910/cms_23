

const connect = require('../../database/connect')
 let addtopic = async(req,res,next)=>{
  let err = ''

  if(!req.body.comment) err +='required text \n'

  if(err!=''){
    res.json({isSuccess:false,err:err})
    return
  }
  const query = `insert into public.comment (text,userid,datetime,ideaid) values('${req.body.comment}','${req.session.user.id}','${req.body.time}',${req.body.ideaid})`
  let comment = await connect(query)
  if(comment.rowCount>0){

    res.json({isSuccess:true})
    global.io.emit('newcomment',{body:true})
    global.io.emit('reloadcount',{body:true})
  }else{

    res.json({isSuccess:false})

  }
}

module.exports = addtopic
