const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require("../models/tokenBO.model");

module.exports = {
    addPointClient: async (site, player_id, point, deposit, memo, round)=>{
        let getToken = await tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
        if(getToken) {
            try {
                let data = {
                    "AccountsString": player_id,
                    "Amount": point,
                    "AmountString": point,
                    "Audit": point * round,
                    "AuditType": "Discount",
                    "DepositToken": deposit,
                    "IsReal": false,
                    "Memo": memo,
                    "Password": information[site].passBO,
                    "PortalMemo": memo,
                    "TimeStamp": new Date().getTime,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information[site].linkBO, 
                        'referer': ' '+information[site].linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                    };
                    
                    return axios(config)
                    .then(function (response) {
                        return response.data
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