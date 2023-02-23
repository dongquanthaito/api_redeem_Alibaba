const mongoose = require('mongoose')
const { loginBOf8bet } = require('../controllers/loginBO.controller')
mongoose.set('strictQuery', true)
const connectDb = async() => {
    try {
        //mongodb://127.0.0.1/database
        //mongodb+srv://irisattapp:Rythermbk98@ali.mrgmvh4.mongodb.net/database
        await mongoose.connect('mongodb+srv://irisattapp:Rythermbk98@ali.mrgmvh4.mongodb.net/database')
        console.log("Connect database Redeem Code_F8 -  Successfully")
        loginBOf8bet()
        setInterval(() => {
            loginBOf8bet()
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