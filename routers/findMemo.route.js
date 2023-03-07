const express = require('express')
const { findMemo } = require('../controllers/find_Memo.controller')
const Router = express.Router()

Router.route('/').post(findMemo)

module.exports = Router