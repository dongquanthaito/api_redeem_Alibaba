const promoCodeModel = require('../models/promoCode.model')

module.exports = {
    postPromoCode: async(req, res) => {
        try {
            let upload = await promoCodeModel.collection.insertMany(req.body)
            res.json(upload)
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    findPromoCode: async(req, res) => {
        let {...query} = req.query
        try {
            if(req.site_info.site == 'alibaba' || req.site_info.site == 'xuxian') {
                let find = await promoCodeModel.find(query)
                if(find.length == 0) {
                    res.json({
                        statusCode: 404,
                        valid: false,
                        mess: 'Not found'
                    })
                } else {
                    res.json({
                        statusCode: 200,
                        valid: true,
                        detail: find
                    })
                }
            } else {
                if(query.site != req.site_info.site) {
                    res.json({
                        statusCode: 404,
                        valid: false,
                        mess: 'Not found'
                    })
                } else {
                    let find = await promoCodeModel.find(query)
                    if(find.length == 0) {
                        res.json({
                            statusCode: 404,
                            valid: false,
                            mess: 'Not found'
                        })
                    } else {
                        let boxFind = []
                        find.forEach((el) => {
                            if(el.site == req.site_info.site) {
                                boxFind.push(el)
                            }
                        })
                        res.json({
                            statusCode: 200,
                            valid: true,
                            detail: boxFind
                        })
                    }
                }
            }
            
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    deletePromoCode: async(req, res) => {
        let {...query} = req.query
        try {
            if(req.site_info.site == 'alibaba' || req.site_info.site == 'xuxian') {
                let del = await promoCodeModel.deleteMany(query)
                res.json(del)
            } else {
                if(query.site != req.site_info.site || query.site == 'user') {
                    res.json({
                        statusCode: 404,
                        valid: false,
                        mess: 'Not found'
                    })
                } else {
                    let del = await promoCodeModel.deleteMany(query)
                    res.json(del)
                }
            }
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    updateCode: async(req, res)=>{
        let {...body} = req.body
        try {
            if(body.date_code) {
                try {
                    let update = await promoCodeModel.updateMany({date_code: body.date_code}, body)
                    if(update) {
                        res.json({
                            status_code: 200,
                            detail: update
                        })
                    } else {
                        res.json({
                            status_code: 404,
                            mess: "Kh??ng t??m th???y t??i kho???n"
                        })
                    }
                } catch (error) {
                    res.json({
                        code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                }
            }
            if(body.site) {
                try {
                    let update = await promoCodeModel.updateMany({site: body.site}, body)
                    if(update) {
                        res.json({
                            status_code: 200,
                            detail: update
                        })
                    } else {
                        res.json({
                            status_code: 404,
                            mess: "Kh??ng t??m th???y t??i kho???n"
                        })
                    }
                } catch (error) {
                    res.json({
                        code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                }
            }
            if(body.promo_code) {
                try {
                    let update = await promoCodeModel.updateMany({promo_code: body.promo_code}, body)
                    if(update) {
                        res.json({
                            status_code: 200,
                            detail: update
                        })
                    } else {
                        res.json({
                            status_code: 404,
                            mess: "Kh??ng t??m th???y t??i kho???n"
                        })
                    }
                } catch (error) {
                    res.json({
                        code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                }
            }
            if(body.promo_id) {
                try {
                    let update = await promoCodeModel.updateMany({promo_id: body.promo_id}, body)
                    if(update) {
                        res.json({
                            status_code: 200,
                            detail: update
                        })
                    } else {
                        res.json({
                            status_code: 404,
                            mess: "Kh??ng t??m th???y m?? khuy???n m??i"
                        })
                    }
                } catch (error) {
                    res.json({
                        code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                }
            }
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
        
    }
}