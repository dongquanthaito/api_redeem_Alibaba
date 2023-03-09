const express = require('express')
const { get_member_BO } = require('../controllers/get_member_BO.controller')
const Router = express.Router()

Router.route('/').get(get_member_BO)

module.exports = Router