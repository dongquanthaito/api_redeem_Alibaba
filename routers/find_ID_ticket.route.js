const express = require('express')
const { find_ID_ticket } = require('../controllers/find_ID_ticket.controller')
const Router = express.Router()

Router.route('/').post(find_ID_ticket)

module.exports = Router