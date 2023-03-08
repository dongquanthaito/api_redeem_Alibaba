const express = require('express')
const { add_point_bo } = require('../controllers/add_point.controller')
const Router = express.Router()

Router.route('/').post(add_point_bo)

module.exports = Router
