const express = require('express')
const { get_timeZone } = require('../controllers/get_timeZone.controller')
const Router = express.Router()

Router.route('/').get(get_timeZone)

module.exports = Router