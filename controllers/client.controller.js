const Fingerprint = require("express-fingerprint");
const promoCodeModel = require("../models/promoCode.model");
const ipfpModel = require("../models/ipfp.model");
const { getTimeZoneClient } = require("./getTimeZone.controller");
const { addPointClient } = require("../services/addPoint.service");
const { getMemberBOService } = require("../services/getMemberBO.service");
const { findMemoBOService } = require("../services/findMemo.service");
const { getDepositBOService } = require("../services/getDeposit.service");

module.exports = {
  getCodeClient: async (req, res) => {
    let { ...query } = req.query;
    try {
      if (!query.promo_code || !query.site) {
        res.json({
          status_code: 400,
          valid: false,
          title_mess: "Vui lòng nhập mã khuyến mãi!",
          text_mess: "Xin quý khách vui lòng kiểm tra và thử lại.",
        });
      } else {
        let find = await promoCodeModel.find(query); //Tìm code
        if (find.length == 0) {
          //Không có code

          res.json({
            status_code: 404,
            valid: false,
            title_mess: "Mã khuyến mãi không chính xác!",
            text_mess: "Xin quý khách vui lòng kiểm tra và thử lại.",
          });
        } else {
          //Có code
          let timeGlobal = await getTimeZoneClient();

          if (timeGlobal == false) {
            res.json({
              status_code: 502,
              valid: false,
              title_mess: "Lỗi hệ thống",
              text_mess: "Mất kết nối đến máy chủ. Xin vui lòng thử lại.",
            });
          } else {
            let timeStamp = new Date(timeGlobal.dateTime).getTime();
            let expTime = find[0].exp_code;

            let date = ("0" + new Date(expTime).getDate()).slice("-2");
            let month = ("0" + (new Date(expTime).getMonth() + 1)).slice("-2");
            let year = new Date(expTime).getFullYear();
            let time = date + " tháng " + month + ", " + year;
            if (expTime < timeStamp) {
              //Kiểm tra hạn sử dụng CODE - Code hết hạn
              res.json({
                status_code: 403,
                valid: false,
                title_mess: "Mã khuyến mãi đã hết hạn sử dụng!",
                detail: {
                  promo_code: find[0].promo_code,
                  point: find[0].point,
                  time: time,
                },
              });
            } else {
              //Code còn hạn sử dụng
              if (find[0].user_used == "non") {
                res.json({
                  status_code: 200,
                  valid: true,
                  title_mess: "Mã khuyến mãi chưa sử dụng!",
                  detail: {
                    promo_code: find[0].promo_code,
                    point: find[0].point,
                    time: time,
                  },
                });
              } else if (find[0].user_used != "non") {
                if (!find[0].used_time) {
                  res.json({
                    status_code: 403,
                    valid: false,
                    title_mess: "Mã khuyến mãi đã được sử dụng!",
                    detail: {
                      promo_code: find[0].promo_code,
                      point: find[0].point,
                    },
                  });
                } else {
                  let usedDate = ("0" + new Date(find[0].used_time).getDate()).slice("-2");
                  let usedMonth = ("0" + (new Date(find[0].used_time).getMonth() + 1)).slice("-2");
                  let usedYear = new Date(find[0].used_time).getFullYear();
                  let used_time = usedDate + " tháng " + usedMonth + ", " + usedYear;

                  res.json({
                    status_code: 403,
                    valid: false,
                    title_mess: "Mã khuyến mãi đã được sử dụng!",
                    detail: {
                      promo_code: find[0].promo_code,
                      point: find[0].point,
                      used_time: used_time,
                    },
                  });
                }
              }
            }
          }
        }
      }
    } catch (error) {
      res.json({
        status_code: 502,
        valid: false,
        title_mess: "Lỗi hệ thống",
        text_mess: "Mất kết nối đến máy chủ. Xin vui lòng thử lại.",
      });
    }
  },

  addPointClient: async (req, res) => {
    let { ...query } = req.query;
    if (!query.promo_code || !query.site || !query.player_id) {
      res.json({
        status_code: 400,
        valid: false,
        title_mess: "Vui lòng nhập mã khuyến mãi!",
        text_mess: "Xin quý khách vui lòng kiểm tra và thử lại.",
      });
    } else {
      try {
        let findPlayerID = await getMemberBOService(query.site, query.player_id);
        if (findPlayerID == 502) {
          res.json({
            status_code: 502,
            valid: false,
            title_mess: "Lỗi hệ thống",
            text_mess: "Mất kết nối đến máy chủ. Xin vui lòng thử lại.",
          });
        } else {
          if (findPlayerID == false) {
            //Kiểm tra tài khoản trên BO
            res.json({
              status_code: 403,
              valid: false,
              title_mess: "Thao tác thất bại !",
              text_mess: "Không tìm thấy thấy tài khoản hoặc tài khoản bị sai. Vui lòng thử lại.",
            });
          } else if (findPlayerID == true) {
            //Kiểm tra trên BO đã nhận KM chưa
            let find = await promoCodeModel.find({ promo_code: query.promo_code });
            let findUser = await promoCodeModel.find({ user_used: query.player_id });
            let expTime = find[0].exp_code;

            let timePrev = expTime - 86400000 * 30;
            let dateExp = ("0" + new Date(timePrev).getDate()).slice("-2");
            let monthExp = ("0" + (new Date(timePrev).getMonth() + 1)).slice("-2");
            let yearExp = new Date(timePrev).getFullYear();
            let timeBegin = yearExp + "/" + monthExp + "/" + dateExp;
            let findMemoResult = await findMemoBOService(query.site, query.player_id, timeBegin, find[0].promo_id);
            if (findMemoResult == true) {
              //Chưa nhận KM trên BO
              //Kiểm tra trên Database đã nhận KM chưa
              if (findUser.length != 0) {
                //user đã nhận code trên database
                res.json({
                  status_code: 403,
                  valid: false,
                  title_mess: "Thao tác thất bại !",
                  text_mess: "Tài khoản " + '"' + query.player_id + '"' + " đã nhận khuyến mãi " + find[0].promo_id + " !",
                });
              } else if (findUser.length == 0) {
                //user chưa nhận code
                let deposit = await getDepositBOService(query.site);
                if (deposit == 502) {
                  res.json({
                    status_code: 502,
                    valid: false,
                    title_mess: "Lỗi hệ thống",
                    text_mess: "Mất kết nối đến máy chủ. Xin vui lòng thử lại.",
                  });
                } else {
                  let addPointResult = await addPointClient(query.site, query.player_id, find[0].point, deposit, find[0].promo_id, find[0].round); //Cộng điểm trên BO
                  if (addPointResult == 502) {
                    res.json({
                      status_code: 502,
                      valid: false,
                      title_mess: "Lỗi hệ thống",
                      text_mess: "Mất kết nối đến máy chủ. Xin vui lòng thử lại.",
                    });
                  } else {
                    let timeGlobal = await getTimeZoneClient();
                    let timeStamp = new Date(timeGlobal.dateTime).getTime();

                    let ipResult = req.ip;
                    let fpResult = req.fingerprint.hash;

                    let body = {
                      promo_code: query.promo_code,
                      user_used: query.player_id,
                      used_time: timeStamp,
                      ip: ipResult,
                      fp: fpResult,
                    };
                    let update = await promoCodeModel.updateMany({ promo_code: query.promo_code }, body);
                    if (update) {
                      let add = await ipfpModel.create({
                        ip: ipResult,
                        fp: fpResult,
                      });
                      if (add) {
                        res.json({
                          status_code: 200,
                          valid: true,
                          status_mess: "Done",
                          player_id: query.player_id,
                          point: find[0].point,
                        });
                      }
                    }
                  }
                }
              }
            } else if (findMemoResult == false) {
              res.json({
                status_code: 403,
                valid: false,
                title_mess: "Thao tác thất bại !",
                text_mess: "Tài khoản " + '"' + query.player_id + '"' + " đã nhận khuyến mãi " + find[0].promo_id + " !",
              });
            }
          }
        }
      } catch (error) {
        res.json({
          status_code: 502,
          valid: false,
          title_mess: "Lỗi hệ thống",
          text_mess: "Mất kết nối đến máy chủ. Xin vui lòng thử lại.",
        });
      }
    }
  },
};
