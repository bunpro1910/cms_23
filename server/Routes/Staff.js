
const express = require('express');
const Staff_Routes = express.Router()

const addtopic = require("./staff/addtopic")
const addcategory = require("./staff/addcategory")
const deletecate = require("./staff/deletecate")
const adddepartment = require("./staff/adddepartment")
const deletedepartment = require("./staff/deletedepartment")
const departmentdetail = require("./staff/departmentdetail")
const addrole = require("./staff/addrole")
const deleterole = require("./staff/deleterole")
const role = require('./staff/role')
const user = require('./Admin/user')
const roledetail = require('./staff/roledetail')
const updateprofile = require('./staff/updateprofile')
const adduser = require('./Admin/adduser')
const multer  = require('multer')
const changepass = require('./staff/changepass')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/file')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
})
var upload = multer({
    storage: storage,
})

Staff_Routes.get("/role",role)
Staff_Routes.get("/roledetail",roledetail)
Staff_Routes.post("/addcategory",addcategory)
Staff_Routes.post("/updateprofile",updateprofile)
Staff_Routes.post("/addrole",addrole)
Staff_Routes.post('/deleterole',deleterole)
Staff_Routes.post("/addtopic",addtopic)
Staff_Routes.post('/deletecate',deletecate)
Staff_Routes.post('/changepass',changepass)
Staff_Routes.post("/adddepartment",adddepartment)
Staff_Routes.post('/deletedepartment',deletedepartment)
Staff_Routes.get("/departmentdetail",departmentdetail)
module.exports = Staff_Routes