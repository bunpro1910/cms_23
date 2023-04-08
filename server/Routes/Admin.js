const express = require('express');
const Admin_Routes = express.Router()
const path = require('path')
const fs = require('fs')
const removeroleuser = require('./Admin/removeroleuser')
const addroleuser = require('./Admin/addroleuser')
const deletetopic = require("./Admin/deletetopic")
const user = require("./Admin/user")
const adduser = require("./Admin/adduser")
const deleteuser = require("./Admin/deleteuser")
Admin_Routes.post("/deletetopic",deletetopic)
Admin_Routes.get("/user",user)
Admin_Routes.post("/adduser",adduser)
Admin_Routes.post("/deleteuser",deleteuser)
Admin_Routes.post("/removerolebyuser",removeroleuser)
Admin_Routes.post("/addrolebyuser",addroleuser)

//post




module.exports = Admin_Routes