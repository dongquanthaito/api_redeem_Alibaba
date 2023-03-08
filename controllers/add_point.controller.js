const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    add_point_bo: async(req, res) => {
        let {...body} = req.body
        try {
            let site = body.site
            let token = await get_deposit_token(site)
            if(token.valid == false) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            } else {
                let deposit_token = token.deposit_token
                let get_token = token.token

                let data = {
                    "AccountsString": body.AccountsString,
                    "Amount": body.Amount,
                    "AmountString": body.Amount,
                    "Audit": body.Audit,
                    "AuditType": "Discount",
                    "DepositToken": deposit_token,
                    "IsReal": false,
                    "Memo": body.Memo,
                    "Password": information[site].passBO,
                    "PortalMemo": body.PortalMemo,
                    "TimeStamp": body.TimeStamp,
                    "Type": 5
                }
                let config = {
                method: 'post',
                url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                headers: { 
                    'authorization': 'Bearer ' + get_token, 
                    'content-type': ' application/json;charset=utf-8', 
                    'origin': ' '+information[site].linkBO, 
                    'referer': ' '+information[site].linkBO+'/',
                    'x-requested-with': ' XMLHttpRequest'
                },
                data : data
                };
                
                axios(config)
                .then(function (response) {
                    res.json(response.data)
                })
                .catch(function (error) {
                    res.json(error);
                });        
            }
        } catch (error) {
            return({
                status_code: 502,
                valid: false,
                mess: "Bad Gateway",
                err: error
            })
        }
    },
}

let get_deposit_token = async(site) => {
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
                return({
                    status_code: 200,
                    valid: true,
                    deposit_token: response.data,
                    token: getToken.Token
                })
            })
            .catch(function (error) {
                return({
                    status_code: 502,
                    valid: false,
                    mess: "Bad Gateway",
                    err: error
                })
            });
        } catch (error) {
            return({
                status_code: 502,
                valid: false,
                mess: "Bad Gateway",
                err: error
            })
        }
    } else {
        return({
            status_code: 502,
            mess: "Bad Gateway",
            err: error
        })
    }   
}