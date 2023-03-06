const express = require('express')
const { update_game_categories, create_game_categories } = require('../controllers/game_categories.controller')
const Router = express.Router()

Router.route('/update').post(update_game_categories)
Router.route('/create').post(create_game_categories)

module.exports = Router