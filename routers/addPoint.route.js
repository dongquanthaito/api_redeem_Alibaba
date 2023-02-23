const express = require('express')
const { f8bet, hi88 } = require('../controllers/addpoint.controller')
const Router = express.Router()

Router.route('/f8bet').post(f8bet)
Router.route('/hi88').post(hi88)

module.exports = Router
