const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    find_ID_ticket: async(req, res) => {
        let {...body} = req.body
        let site = body.site
        console.log(information[site].usernameBO)
        let getToken = tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
        console.log(getToken)

        if(getToken) {
            try {
                let axios = require('axios');
                let data = {
                    "connectionId": information[site].connectionId,
                    "searchParams":{
                        "WagersTimeBegin": body.start_time,
                        "WagersTimeEnd": body.end_time,
                        "PayoffTimeBegin": body.start_time,
                        "PayoffTimeEnd": body.end_time,
                        "GameCategories":body.game_categories,
                        "RawWagersId": body.ticket_id,
                        "AGSearchType":0
                    }
                };
    
                let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://management.cdn-dysxb.com/api/1.0/betrecord/list',
                headers: { 
                    'authorization': 'Bearer ' + getToken.Token, 
                    'content-type': 'application/json;charset=utf-8', 
                    'origin': ' '+ information[site].linkBO, 
                    'referer': ' '+ information[site].linkBO+'/',
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
                        code: 401,
                        mess: "Error",
                        error: error
                    })
                });
    
            } catch (error) {
                res.json({
                    code: 401,
                    mess: "Error",
                    error: error
                })
            }
        } else {
            res.json({
                code: 502,
                mess: "Bad Gateway"
            })
        }
    }
}