const express = require('express')
const Router = express.Router()

const role = require('../middlewares/role.middleware')
const roleType =require('../const/role')
const auth = require('../middlewares/auth.middleware')
const async_handler = require('../middlewares/async.middleware')
const site = require('../middlewares/site.middleware')

const { findPromoCode, postPromoCode, deletePromoCode, updateCode } = require('../controllers/promoCode.controller')

Router.route('/').get(async_handler(auth), role([roleType.SUPERADMIN, roleType.ADMIN, roleType.USER]), site, findPromoCode)
Router.route('/').post(postPromoCode)
Router.route('/').delete(async_handler(auth), role([roleType.SUPERADMIN, roleType.ADMIN]), site, deletePromoCode)
Router.route('/').patch(async_handler(auth), role([roleType.SUPERADMIN, roleType.ADMIN]), updateCode)

module.exports = Router