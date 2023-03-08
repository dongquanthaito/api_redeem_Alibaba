const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    check_ve_gop: async(req, res) => {
        let {...body} = req.body
        let site = body.site
        let Account = body.account
        let start_time = body.start_time
        let end_time = body.end_time
        let game_categories = body.game_categories
        try {
            let getToken = await tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
            if(getToken) {
                let data = {
                    "searchParams": {
                      "Account": Account,
                      "WagersTimeBegin": start_time,
                      "WagersTimeEnd": end_time,
                      "GameCategories": game_categories,
                      "AGSearchType": "0"
                    },
                    "pageSize": 5000
                }
    
                let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://management.cdn-dysxb.com/api/1.0/betRecord/advanced/search',
                headers: { 
                    'authorization': 'Bearer ' + getToken.Token, 
                    'content-type': 'application/json;charset=utf-8', 
                    'origin': ' '+information[site].linkBO, 
                    'referer': ' '+information[site].linkBO+'/',
                    'x-requested-with': 'XMLHttpRequest'
                },
                data : data
                };
    
                axios(config)
                .then(function (response) {
                    res.json(response.data)
                })
                .catch(function (error) {
                    res.json({
                        status_code: 400,
                        valid: false,
                        mess: 'error',
                        error: error
                    })
                });
            } else {
                res.json({
                    status_code: 502,
                    valid: false,
                    mess: "Bad Gateway",
                })
            }
        } catch (error) {
            res.json({
                status_code: 503,
                valid: false,
                mess: 'Bad Gateway',
                error: error
            })
        }
    }
}