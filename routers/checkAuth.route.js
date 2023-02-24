const express = require('express')
const Router = express.Router()

const { checkAuth } = require('../controllers/checkAuth.controller')

Router.route('/').get(checkAuth)

module.exports = Router