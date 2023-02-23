const axios = require('axios');
const information = require("../const/information");
const tokenBOModel = require("../models/tokenBO.model");

module.exports = {
    getMemberBOService: async (site, player_id) => {
        let getToken = await tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
        if(getToken) {
            try {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/Member/GetMemberSuggestion?query='+player_id,
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information[site].linkBO, 
                        'referer': ' '+information[site].linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    }
                };
                return axios(config)
                .then(function (response) {
                    let playerID = 'non'
                    response.data.forEach((el) => {
                        if(el.Account == player_id) {
                            playerID = player_id
                        } else if(el.Account != player_id) {
                            playerID
                        }
                    })
                    if(playerID == 'non') {
                        return false
                    } else if(playerID != 'non'){
                        return true
                    }
                })
                .catch(function (error) {
                    
                    return 502
                });
            } catch (error) {
                return 502
            }
        } else {
            return 502
        }
    }
}