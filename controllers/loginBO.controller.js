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
                        console.log("Find And Update Token into Schema - Success")
                        console.log('-------------------')
                    } else {
                        await tokenBOModel.create(dataToken)
                        console.log("Create Token into Schema - Success")
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