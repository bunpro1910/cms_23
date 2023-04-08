

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {
    if(!req.body.id){
        res.json({isSussess:false,err:"required ID"})
    }
    let query1 = `delete from public.roledetail where account_id= '${req.body.id}';
    delete from public.idea where userid= '${req.body.id}';
    delete from public.comment where userid= '${req.body.id}';
    delete from public.react where userid= '${req.body.id}';
    delete from public.view where userid= '${req.body.id}';
    delete from public.user where id = '${req.body.id}';
    delete from public.account where username = '${req.body.id}';
    `
    let result1 = await connect(query1)
   
    let isSuccess = true
    result1.map((item,i)=>{
        if(item=="error"){
            isSuccess = false
        }
    })
    global.io.emit('reloaduser', { body: true })
    res.json({isSuccess: isSuccess})

}

module.exports = addtopic
