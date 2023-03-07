const axios = require('axios');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    findMemo: (req, res) => {
        let {...body} = req.body
        let site = body.site
        let getToken = tokenBOModel.findOne({Account: information[site].usernameBO}).exec()
        if(getToken) {
            try {
                let data = {
                    "pageInfo": {
                        "count": 1000,
                        "index": 0
                    },
                    "search": {
                    "Account": body.Account,
                    "agSearchType": 0,
                    "TimeBegin": body.TimeBegin,
                    "Types": [
                        "Bonus"
                    ]
                    }
                }
               
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/api/1.0/transactions/query',
                    headers: { 
                        'authorization': 'Bearer '+ getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' '+information[site].linkBO, 
                        'referer': ' '+information[site].linkBO+'/',
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                };
                
                axios(option)
                .then(function (response) {
                    let boxMemo = []
                    response.data.Result.Records.forEach((el) => {
                        if(el.Memo == body.Memo) {
                            boxMemo.push(el.Memo)
                        }
                    })
                    if(boxMemo.includes(body.Memo)) {
                        res.json({
                            status_code: 200,
                            valid: false,
                            mess: "Đã nhận khuyến mãi."
                        })
                    } else {
                        res.json({
                            status_code: 404,
                            valid: true,
                            mess: "Chưa nhận khuyến mãi."
                        })
                    }
                })
                .catch(function (error) {
                    res.json({
                        status_code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                });
            } catch (error) {
                res.json({
                    status_code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        } else {
            res.json({
                status_code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }        
    }
}