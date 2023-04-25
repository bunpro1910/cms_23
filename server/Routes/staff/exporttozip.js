const { json } = require("body-parser")
const excel = require('excel4node');
var JSZip = require("jszip");
const fs = require("fs");
const connect = require('../../database/connect')
  let arr = []
  var zip = new JSZip()
 let addtopic = async(req,res,next)=>{
  const workbook = new excel.Workbook(
    {    // optional params object
      jszip: {
          compression: 'DEFLATE'   // change the zip compression method
      },} 
  );
  const worksheet = workbook.addWorksheet('bunpro');
  const style = workbook.createStyle({
    
    font: {
      color: '#000000',
      size: 12
    },
  });
  if(! req.query.id){
    res.json({isSuccess:false,err:"need id topic"})
   }
   const query = `select * from public.idea where topicid = '${req.query.id}'`
   
   const query2 = `select r.react,r.ideaid from public.react as r,public.idea as i , public.topic as t where r.ideaid = i.id and i.topicid = t.id and t.id ='${req.query.id}'`
   const result2 = await connect (query2)
   const query3 = `select v.ideaid from public.view as v,public.topic as t, public.idea as i where v.ideaid = i.id and t.id = i.topicid and t.id='${req.query.id}' `
   const result3 = await connect (query3)
   
  
   const result = await connect (query)
   worksheet.cell(1,1).string("NO").style(style)
   worksheet.cell(1,2).string("Title").style(style)
   worksheet.cell(1,3).string("Brief").style(style)
   worksheet.cell(1,4).string("Content").style(style)
   worksheet.cell(1,5).string("FilePath").style(style)
   worksheet.cell(1,6).string("Date").style(style)
   worksheet.cell(1,7).string("Total Like").style(style)
   worksheet.cell(1,8).string("Total View").style(style)
   worksheet.cell(1,9).string("Total Dislike").style(style)
   if(result.rowCount>0){
    result.rows.map((item,i)=>{
      let totalview = 0
        let totallike=0
        let totaldislike=0
        result2.rows.filter((e)=> {if(e.ideaid == item.id &&e.react ==1){totallike++}})
        result2.rows.filter((e)=> {if(e.ideaid == item.id &&e.react ==-1){totaldislike++}})
        result3.rows.filter((e)=> {if(e.ideaid == item.id ){totalview++}})
        worksheet.cell(i+2,1).string(`${i+1}`).style(style)
        worksheet.cell(i+2,2).string(`${item.title}`).style(style)
        worksheet.cell(i+2,3).string(`${item.text}`).style(style)
        worksheet.cell(i+2,4).string(`${item.title}`).style(style)
        worksheet.cell(i+2,5).string(`${item.filepath}`).style(style)
        worksheet.cell(i+2,6).string(`${item.datetime}`).style(style)
        worksheet.cell(i+2,7).string(`${totallike}`).style(style)
        worksheet.cell(i+2,8).string(`${totalview}`).style(style)
        worksheet.cell(i+2,9).string(`${totaldislike}`).style(style)
        try{
          let file = fs.readFileSync(__dirname+`/../..${item.filepath}`)
          zip.file(item.filepath.split("\\")[item.filepath.split("\\").length - 1],file, {binary: true } )
        }catch(e){
          console.log(e)
        }
      
    })
   }

 let excels = await workbook.writeToBuffer()
 console.log(excels)
 zip.file("excel.xlsx",excels,{ binary : true } )
 
 zip.generateAsync({ type : "nodebuffer", compression: 'DEFLATE' }) .then(function (content) {
  res.writeHead(200, {
    'Content-Disposition': `attachment; filename="excel.zip"`,
    'Content-Type': 'application/zip',
  })
return res.end(content);
});

   
  

}

module.exports = addtopic
