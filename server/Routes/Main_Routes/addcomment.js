

const connect = require('../../database/connect')
const nodemailer = require('nodemailer')
let addtopic = async (req, res, next) => {
  let err = ''

  if (!req.body.comment) err += 'required text \n'

  if (err != '') {
    res.json({ isSuccess: false, err: err })
    return
  }
  const query = `insert into public.comment (text,userid,datetime,ideaid) values('${req.body.comment}','${req.session.user.id}','${req.body.time}',${req.body.ideaid})`
  let comment = await connect(query)

  if (comment.rowCount > 0) {
    const query1 = `select u.email from public.idea as i,public.user as u   where i.id=${req.body.ideaid} and u.id= i.userid`
    const result1 = await connect(query1)
    res.json({ isSuccess: true })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'gokuhieu20@gmail.com',
        pass: 'zkebzsornfordonc',
      },
      secure:false,
      tls: {
        rejectUnauthorized: false
      }
    });
     transporter.sendMail({
      from: '"your idea have new comment" <gokuhieu20@gmail.com>',
      to: result1.rows[0].email,
      subject: `Your Idea have new comment`,
      text: ``,
      html: `${req.body.comment}`,
    },(err,result)=>{});
    global.io.emit('newcomment', { body: true })
    global.io.emit('reloadcount', { body: true })
  } else {

    res.json({ isSuccess: false })

  }
}

module.exports = addtopic
