const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    f8bet: async (req, res)=>{
        let getToken = tokenBOModel.findOne({Account: information.f8bet.usernameBO}).exec()
        if(getToken) {
            let {...body} = req.body
            try {
                let data = {
                    "AccountsString": body.AccountsString,
                    "Amount": body.Amount,
                    "AmountString": body.Amount,
                    "Audit": body.Audit,
                    "AuditType": "Discount",
                    "DepositToken": body.DepositToken,
                    "IsReal": false,
                    "Memo": body.Memo,
                    "Password": information.f8bet.passBO,
                    "PortalMemo": body.PortalMemo,
                    "TimeStamp": body.TimeStamp,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information.f8bet.linkBO, 
                        'referer': ' '+information.f8bet.linkBO+'/',
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
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        } else {
            res.json({
                code: 502,
                mess: "Bad Gateway"
            })
        }
        
    },
    hi88: async (req, res)=>{
        let getToken = tokenBOModel.findOne({Account: information.hi88.usernameBO}).exec()
        if(getToken) {
            let {...body} = req.body
            try {
                let data = {
                    "AccountsString": body.AccountsString,
                    "Amount": body.Amount,
                    "AmountString": body.Amount,
                    "Audit": body.Audit,
                    "AuditType": "Discount",
                    "DepositToken": body.DepositToken,
                    "IsReal": false,
                    "Memo": body.Memo,
                    "Password": information.hi88.passBO,
                    "PortalMemo": body.PortalMemo,
                    "TimeStamp": body.TimeStamp,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information.hi88.linkBO, 
                        'referer': ' '+information.hi88.linkBO+'/',
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
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
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