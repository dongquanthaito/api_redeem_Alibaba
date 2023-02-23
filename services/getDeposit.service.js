const axios = require('axios');
const information = require("../const/information");
const tokenBOModel = require("../models/tokenBO.model");

module.exports = {
    getDepositBOService: async(site) => {
        let getToken = await tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
        if(getToken) {
            try {
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/Member/DepositToken',
                    headers: { 
                      'authorization': 'Bearer ' + getToken.Token, 
                      'content-type': ' application/json;charset=utf-8', 
                      'origin': ' '+information[site].linkBO, 
                      'referer': ' '+information[site].linkBO+'/',
                      'x-requested-with': ' XMLHttpRequest'
                    },
                };
                
                return axios(option)
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    return 502
                });
            } catch (error) {
                return 502
            }
        }
        

    }
}