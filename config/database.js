const mongoose = require('mongoose')
const { loginBOf8bet, loginBOhi88 } = require('../controllers/loginBO.controller')
mongoose.set('strictQuery', true)
const connectDb = async() => {
    try {
        //mongodb://127.0.0.1/database
        //mongodb+srv://irisattapp:Rythermbk98@ali.mrgmvh4.mongodb.net/database
        await mongoose.connect('mongodb://14.225.217.249/database')
        console.log("Connect database Redeem Code_Alibaba -  Successfully")
        loginBOf8bet()
        loginBOhi88()
        setInterval(() => {
            loginBOf8bet()
            loginBOhi88()
        }, 1800000);
    } catch (error) {
        console.log({
            status: 502,
            mess: "Bad Gateway",
            error: error
        })
    }
}

module.exports = connectDb