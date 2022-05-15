const {user} = require('../models')
const AppErrors = require('../utils/AppErrors')

const registerUser = async(req,res,next) => {
    try {
        const {username,email,password} = req.body
        //let doesExist = []

        if(!username || !email || !password) {
            return next(new AppErrors('Mohon Isi Email, Username, dan Password', 400))
        }

        //check if user already register
        const doesExist = await user.findOne({
            where: {
                email: email
            },
            logging: false,
            raw: true
        })

        //console.log(doesExist)

        if(doesExist != null){
            return next(new AppErrors('Email Sudah Terdaftar, Mohon Gunakan Email Yang Lain', 409))
        }

        const data = await user.create({
            username,
            email,
            password,
            
        },{logging: false})

        console.log(">>>>")

        res.status(201).json({
            status:"success",
            data: {
                user: {
                    username: data.username,
                    email: data.email
                }
            }
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    registerUser
}