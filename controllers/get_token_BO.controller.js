const information = require("../const/information")
const tokenBOModel = require("../models/tokenBO.model")

module.exports = {
    get_token_BO: async(req, res) => {
        let {...query} = req.query
        try {
            let site = query.site
            let getToken = await tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
            if(getToken) {
                res.json({
                    status_code: 200,
                    valid: true,
                    result: getToken
                })
            } else {
                res.json({
                    status_code: 404,
                    valid: false,
                    mess: "Invalid Token"
                })
            }
        } catch (error) {
            res.json({
                status_code: 500,
                valid: false,
                mess: "Bad Gateway",
                error: error
            })
        }
        
    }
}