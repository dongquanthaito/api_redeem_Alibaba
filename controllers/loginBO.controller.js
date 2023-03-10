const axios = require('axios')
const jwt_decode = require('jwt-decode');
const information = require('../const/information');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    loginBOf8bet: () => {
        let data = {
            "account": information.f8bet.usernameBO,
            "password": information.f8bet.passBO
        };
        
        let config = {
          method: 'post',
          url: 'https://management.cdn-dysxb.com/api/2.0/account/login',
          headers: { 
            'accept': ' */*', 
            'content-type': ' application/json', 
            'origin': ' '+information.f8bet.linkBO, 
            'referer': ' '+information.f8bet.linkBO+'/', 
            'x-requested-with': ' XMLHttpRequest'
          },
          data : data
        };
        
        return axios(config)
        .then(async function (response) {
            console.log("Login BO - Success")
            let decode = jwt_decode(response.data.Result.AccessToken)
            if(decode) {
                let dataToken = {
                    "exp": decode.exp,
                    "nbf": decode.nbf,
                    "Id": decode.Id,
                    "Account": decode.Account,
                    "IsSub": decode.IsSub,
                    "IsVisible": decode.IsVisible,
                    "Isvalidated": decode.Isvalidated,
                    "Token": response.data.Result.AccessToken
                }

                try {
                    let updateDataToken = await tokenBOModel.findOneAndUpdate({Account: decode.Account}, dataToken, {new: true})
                    if(updateDataToken) {
                        console.log("Find And Update F8BET Token into Schema - Success")
                        console.log('-------------------')
                    } else {
                        await tokenBOModel.create(dataToken)
                        console.log("Create F8BET Token into Schema - Success")
                        console.log('-------------------')
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
            return response.data.Result.AccessToken
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loginBOhi88: () => {
        let data = {
            "account": information.hi88.usernameBO,
            "password": information.hi88.passBO
        };
        
        let config = {
          method: 'post',
          url: 'https://management.cdn-dysxb.com/api/2.0/account/login',
          headers: { 
            'accept': ' */*', 
            'content-type': ' application/json', 
            'origin': ' '+information.hi88.linkBO, 
            'referer': ' '+information.hi88.linkBO+'/', 
            'x-requested-with': ' XMLHttpRequest'
          },
          data : data
        };
        
        return axios(config)
        .then(async function (response) {
            console.log("Login BO - Success")
            let decode = jwt_decode(response.data.Result.AccessToken)
            if(decode) {
                let dataToken = {
                    "exp": decode.exp,
                    "nbf": decode.nbf,
                    "Id": decode.Id,
                    "Account": decode.Account,
                    "IsSub": decode.IsSub,
                    "IsVisible": decode.IsVisible,
                    "Isvalidated": decode.Isvalidated,
                    "Token": response.data.Result.AccessToken
                }

                try {
                    let updateDataToken = await tokenBOModel.findOneAndUpdate({Account: decode.Account}, dataToken, {new: true})
                    if(updateDataToken) {
                        console.log("Find And Update Hi88 Token into Schema - Success")
                        console.log('-------------------')
                    } else {
                        await tokenBOModel.create(dataToken)
                        console.log("Create Hi88 Token into Schema - Success")
                        console.log('-------------------')
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
            return response.data.Result.AccessToken
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loginBOshbet: () => {
        let data = {
            "account": information.shbet.usernameBO,
            "password": information.shbet.passBO
        };
        
        let config = {
          method: 'post',
          url: 'https://management.cdn-dysxb.com/api/2.0/account/login',
          headers: { 
            'accept': ' */*', 
            'content-type': ' application/json', 
            'origin': ' '+information.shbet.linkBO, 
            'referer': ' '+information.shbet.linkBO+'/', 
            'x-requested-with': ' XMLHttpRequest'
          },
          data : data
        };
        
        return axios(config)
        .then(async function (response) {
            console.log("Login BO - Success")
            let decode = jwt_decode(response.data.Result.AccessToken)
            if(decode) {
                let dataToken = {
                    "exp": decode.exp,
                    "nbf": decode.nbf,
                    "Id": decode.Id,
                    "Account": decode.Account,
                    "IsSub": decode.IsSub,
                    "IsVisible": decode.IsVisible,
                    "Isvalidated": decode.Isvalidated,
                    "Token": response.data.Result.AccessToken
                }

                try {
                    let updateDataToken = await tokenBOModel.findOneAndUpdate({Account: decode.Account}, dataToken, {new: true})
                    if(updateDataToken) {
                        console.log("Find And Update SHBET Token into Schema - Success")
                        console.log('-------------------')
                    } else {
                        await tokenBOModel.create(dataToken)
                        console.log("Create SHBET Token into Schema - Success")
                        console.log('-------------------')
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
            return response.data.Result.AccessToken
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loginBOnew88: () => {
        let data = {
            "account": information.new88.usernameBO,
            "password": information.new88.passBO
        };
        
        let config = {
          method: 'post',
          url: 'https://management.cdn-dysxb.com/api/2.0/account/login',
          headers: { 
            'accept': ' */*', 
            'content-type': ' application/json', 
            'origin': ' '+information.new88.linkBO, 
            'referer': ' '+information.new88.linkBO+'/', 
            'x-requested-with': ' XMLHttpRequest'
          },
          data : data
        };
        
        return axios(config)
        .then(async function (response) {
            console.log("Login BO - Success")
            let decode = jwt_decode(response.data.Result.AccessToken)
            if(decode) {
                let dataToken = {
                    "exp": decode.exp,
                    "nbf": decode.nbf,
                    "Id": decode.Id,
                    "Account": decode.Account,
                    "IsSub": decode.IsSub,
                    "IsVisible": decode.IsVisible,
                    "Isvalidated": decode.Isvalidated,
                    "Token": response.data.Result.AccessToken
                }

                try {
                    let updateDataToken = await tokenBOModel.findOneAndUpdate({Account: decode.Account}, dataToken, {new: true})
                    if(updateDataToken) {
                        console.log("Find And Update NEW88 Token into Schema - Success")
                        console.log('-------------------')
                    } else {
                        await tokenBOModel.create(dataToken)
                        console.log("Create NEW88 Token into Schema - Success")
                        console.log('-------------------')
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
            return response.data.Result.AccessToken
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getTokenBO: async(req, res) => {
        let {...query} = req.query
        console.log(query.site)
        let getToken = await tokenBOModel.findOne({Account: information[query.site].usernameBO}).exec()
        if(getToken) {
            res.json(getToken)
        } else {
            res.json({
                status_code: 404,
                valid: false,
                err: "Invalid Token"
            })
        }
    }
}