const express = require('express');
const Main_Routes = express.Router()
const path = require('path')
const fs = require('fs')


const loginroutes = require("./Main_Routes/login")
const handlelogin = require("./Main_Routes/loginhandle")

const logoutroutes = require("./Main_Routes/logout")
const topic = require("./Main_Routes/topic")

const view = require("./Main_Routes/view")
const idea = require("./Main_Routes/idea")
const count = require("./Main_Routes/count")
const addreact = require("./Main_Routes/addreact")
const addview = require("./Main_Routes/addview")
const exportexcel = require("./staff/exportexcel")
const exportzip = require("./staff/exporttozip")
const countreact = require("./Main_Routes/countreact")
const addcomment = require("./Main_Routes/addcomment")
const comment = require("./Main_Routes/comment")
const category = require("./Main_Routes/category")
const department = require("./Main_Routes/department")
const addidea = require("./Main_Routes/addidea")


Main_Routes.get("/authentication",loginroutes)
Main_Routes.get("/logout",logoutroutes)
//post
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/file')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);
    }
})
var upload = multer({
    storage: storage,
})
Main_Routes.get("/topic",topic)
Main_Routes.get("/idea",idea)
Main_Routes.get("/addreact",addreact)
Main_Routes.get("/addview",addview)
Main_Routes.get("/export",exportexcel)
Main_Routes.get("/exportzip",exportzip)
Main_Routes.get("/view",view)
Main_Routes.post("/addidea",upload.any(),addidea)
Main_Routes.get("/count",count)
Main_Routes.get("/category",category)
Main_Routes.get("/department",department)


Main_Routes.get("/countreact",countreact)
Main_Routes.post("/addcomment",addcomment)
Main_Routes.get("/comment",comment)
Main_Routes.post("/authentication",handlelogin)


module.exports = Main_Routes