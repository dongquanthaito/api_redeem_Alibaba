const express = require('express')
const { randomCode } = require('../controllers/randomCode.controller')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const async_handler = require('../middlewares/async.middleware')
const roleType =require('../const/role')
const site = require('../middlewares/site.middleware')

const Router = express.Router()

Router.route('/').post(async_handler(auth), role([roleType.SUPERADMIN, roleType.ADMIN]), site, randomCode)

module.exports = Router
