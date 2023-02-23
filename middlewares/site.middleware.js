
const information = require('../const/information')

module.exports = async(req,res,next)=>{
    try {
        let site_info = information[req.account.site]
        req.site_info = site_info
        next()
    } catch (error) {
        res.json({
            status_code:500,
            valid:false,
            error:error,
            message:"Vui lòng kiểm tra lại!"
        })
    }
}