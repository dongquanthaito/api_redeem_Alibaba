const express = require('express')
const { get_token_BO } = require('../controllers/get_token_BO.controller')
const Router = express.Router()

Router.route('/').get(get_token_BO)

module.exports = Router