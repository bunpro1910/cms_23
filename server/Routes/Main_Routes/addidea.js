

const connect = require('../../database/connect')
const nodemailer = require('nodemailer')

let addtopic = async (req, res, next) => {

    console.log(req.body.cateid)
    let cateid = req.body.cateid
    let text = req.body.text
    let user = req.session.user.id
    let date = new Date()/ 1000.0
    let topicid = req.body.topicid
    let title = req.body.title
    let file = "/"+req.files[0].path
    let brief = req.body.brief
    //nodemailer sendmail?
    let query = `insert into public.idea (title,text,datetime,filepath,userid,categoryid,topicid,brief) values('${title}','${text}',to_timestamp(${date}),'${file}','${user}','${cateid}','${topicid}','${brief}')`
    let result = await connect(query)

    if(result.rowCount>0){
      let query1 = `select u.id,u.email,u.fullname,u.phone from public.user as u, public.role as r, public.roledetail as rd where rd.roleid = r.id and rd.account_id = u.accountid and r.name = 'QA manager' and u.departmentid = '${req.session.user.departmentid}'`
      let result1 = await connect(query1)
      let arremail = result1.rows.reduce((arr,row)=>{
        arr.push(row.email)
        return arr
      },[])
      let arrid = result1.rows.reduce((arr,row)=>{
        arr.push(row.id)
        return arr
      },[])
        //back up account
        //gokuhieu20@gmail.com
        //zkebzsornfordonc
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587 ,
            auth: {
              user: 'sonplhgcs190828@fpt.edu.vn',
              pass: 'uxsxqejywnduyyep',
            },
          });
          let info = transporter.sendMail({
            from: '"your Staff was submit " <sonplhgcs190828@fpt.edu.vn>', 
            to: arremail,
            subject: `Your Staff have submit successfully`,
            secure: false, 
            text: ``, 
            html: `the information of Staff, fullname : ${req.session.user.fullname}, phone : ${req.session.user.phone} here is link to view Staff submisstion <a href ="http://localhost:3000/idea/${topicid}"> your submisson  </a>`,
          });
          info.then(result=>{
           
         })  
         global.io.emit("reloadidea",{user:arremail}) 
         res.json({isSuccess:true})
    }else{
        res.json({isSuccess:false,err:"something when wrong"})
    }
}

module.exports = addtopic
