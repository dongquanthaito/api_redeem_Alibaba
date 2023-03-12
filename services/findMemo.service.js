const axios = require("axios");
const information = require("../const/information");
const tokenBOModel = require("../models/tokenBO.model");

module.exports = {
  findMemoBOService: async (site, playerID, timeBegin, memo) => {
    let getToken = await tokenBOModel.findOne({ Account: information[site].usernameBO }).exec();
    if (getToken) {
      try {
        let data = {
          pageInfo: {
            count: 1000,
            index: 0,
          },
          search: {
            Account: playerID,
            agSearchType: 0,
            TimeBegin: timeBegin,
            Types: ["Bonus"],
          },
        };
        let option = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://management.cdn-dysxb.com/api/1.0/transactions/query",
          headers: {
            authorization: "Bearer " + getToken.Token,
            "content-type": " application/json;charset=utf-8",
            origin: " " + information[site].linkBO,
            referer: " " + information[site].linkBO + "/",
            "x-requested-with": " XMLHttpRequest",
          },
          data: data,
        };
        return axios(option)
          .then(function (response) {
            let boxMemo = [];
            response.data.Result.Records.forEach((el) => {
              if (el.Memo == memo) {
                boxMemo.push(el.Memo);
              }
            });
            console.log(boxMemo);
            // SH hoặc NEW cho mỗi tài khoản nhận được 3 lần
            if (site == "shbet" || site == "new88") {
              if (boxMemo.length < 4) {
                return true;
              } else {
                return false;
              }
            } else {
              if (boxMemo.includes(memo)) {
                return false;
              } else {
                return true;
              }
            }
          })
          .catch(function (error) {
            return 502;
          });
      } catch (error) {
        return 502;
      }
    } else {
      return 502;
    }
  },
};
