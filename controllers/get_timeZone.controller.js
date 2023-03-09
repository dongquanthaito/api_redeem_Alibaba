const axios = require('axios');

module.exports = {
    get_timeZone: async(req, res) => {
        let {...query} = req.query
        try {
            let timeZone = query.timeZone
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://www.timeapi.io/api/Time/current/zone?timeZone=' + timeZone,
                headers: { 
                  'Accept': 'application/json'
                }
              };
              
              axios(config)
              .then(function (response) {
                if(response.data) {
                    res.json({
                        status_code: 400,
                        valid: false,
                        mess: "Bad Request",
                    })
                } else {
                    res.json({
                        status_code: 200,
                        valid: true,
                        result: response.data
                    })
                }
              })
              .catch(function (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
              });
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    }
}