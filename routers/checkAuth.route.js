const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/auth.middleware')
const async_handler = require('../middlewares/async.middleware')

const { checkAuth } = require('../controllers/checkAuth.controller')

Router.route('/').get(async_handler(auth), checkAuth)

module.exports = Router