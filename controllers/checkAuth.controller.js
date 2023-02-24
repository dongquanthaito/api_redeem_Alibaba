module.exports = {
    checkAuth: async(req, res) => {
        try {
            let decode = jwt.verify(req.headers.authorization,"abcxyz")
            if(decode){
                let account = await accountmodel.findById(decode._id)
                if(account==null){
                    res.json({
                        statusCode: 498,
                        valid:false,
                        mess:"Token invalid"
                    })
                }else{
                    req.account = account
                    res.json('pong')
                }
            }else{
                res.json({
                    statusCode: 403,
                    valid:false,
                    mess:"Forbidden"
                })
            }
        } catch (error) {
            res.json({
                statusCode: 403,
                err: 'Token Error',
                detail: error
            })
        }
    }
}