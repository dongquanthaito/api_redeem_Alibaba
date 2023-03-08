const express = require('express')
const { check_ve_gop } = require('../controllers/check_ve_gop.controller')
const Router = express.Router()

Router.route('/').post(check_ve_gop)

module.exports = Router