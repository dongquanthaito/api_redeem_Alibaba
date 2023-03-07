const game_categories_models = require('../models/game_categories.model')

module.exports = {
    update_game_categories: async(req, res) => {
        let {...body} = req.body
        try {
            let update = await game_categories_models.updateMany(body)
            if(update) {
                res.json({
                    status_code: 200,
                    valid: true,
                    mess: "Update Successfully",
                    result: update
                })
            } else {
                res.json({
                    status_code: 400,
                    valid: false,
                    mess: "Update Error",
                    result: update
                })
            }
        } catch (error) {
            res.json({
                status_code: 400,
                valid: false,
                message: "Bad Request",
                error: error
            })
        }
    },

    create_game_categories: async(req, res) => {
        let {...body} = req.body
        try {
            let update = await game_categories_models.create(body)
            if(update) {
                res.json({
                    status_code: 200,
                    valid: true,
                    mess: "Create Successfully",
                    result: update
                })
            } else {
                res.json({
                    status_code: 400,
                    valid: false,
                    mess: "Create Error",
                    result: update
                })
            }
        } catch (error) {
            res.json({
                status_code: 400,
                valid: false,
                message: "Bad Request",
                error: error
            })
        }
    },
    get_game_categories: async(req, res) => {
        let {...query} = req.query
        try {
            let get = await game_categories_models.find(query)
            if(get == '') {
                res.json({
                    status_code: 404,
                    valid: false,
                    message: "Not found",
                })
            } else {
                res.json({
                    status_code: 200,
                    valid: true,
                    result: get
                })
            }

        } catch (error) {
            res.json({
                status_code: 400,
                valid: false,
                message: "Bad Request",
                error: error
            })
        }
    }
}