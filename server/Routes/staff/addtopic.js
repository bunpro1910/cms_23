

const connect = require('../../database/connect')
let addtopic = async (req, res, next) => {
  let err = ''
  console.log(req.body)

  if (!req.body.topic.id) err += 'required id \n'
  if (!req.body.topic.name) err += 'required name \n'
  if (!req.body.topic.clousuredate) err += 'required date \n'
  if (!req.body.topic.finalclosuredate) err += 'required finaldate \n'
  const id = req.body.topic.id
  const name = req.body.topic.name
  const clousuredate = req.body.topic.clousuredate
  const finalclosuredate = req.body.topic.finalclosuredate

  if (err != '') {
    res.json({ isSuccess: false, err: err })
    return
  }
  let date = new Date(clousuredate) / 1000.00
  console.log(date)
  let finaldate = new Date(finalclosuredate) / 1000.00
  let query = `insert into public.topic (id,name,clousuredate,finalclosuredate) values('${id}','${name}',to_timestamp(${date}),to_timestamp(${finaldate}))`
  if (req.body.update == 1) {
    query = `update public.topic set name = '${name}',clousuredate = to_timestamp(${date}),finalclosuredate = to_timestamp(${finaldate}) where id = '${id}' `
  }

  if (req.body.oldid && req.body.oldid != id) {
    query = `
      insert into public.topic (id,name,clousuredate,finalclosuredate) values('${id}','${name}',to_timestamp(${date}),to_timestamp(${finaldate}));
      delete from public.topic where id = '${req.body.oldid}';
      update public.idea set topicid = '${id}' where topicid = '${req.body.oldid}';
    `
  }

  let topic = await connect(query)
  if (req.body.oldid && req.body.oldid != id) {
    res.json({ isSuccess: true })
    global.io.emit('newtopic', { body: true })
    return
  }
  if (topic.rowCount > 0) {

    res.json({ isSuccess: true })
    global.io.emit('newtopic', { body: true })
  } else {

    res.json({ isSuccess: false })

  }
}

module.exports = addtopic
