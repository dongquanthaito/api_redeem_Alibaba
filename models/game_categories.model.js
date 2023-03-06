const mongoose = require('mongoose')
const game_categories_schema = mongoose.Schema({
    game_categories_id: {
        type: String,
        required: true,
        unique: true
    },
    game_categories: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('game_categories', game_categories_schema)