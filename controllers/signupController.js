const userData = require('../Data/userData')
const userModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')

const registerNewUser = async (request, response) => {
    const userData = request.body.userData
    try {
        const existingUser = await userModel.findOne({ email: userData.email })
        if (existingUser) {
            return response.status(409).json({ message: 'Already existing user' })
        }
        const encryptedPassword = await bcrypt.hash(userData.password, 10)
        const user = new userModel({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: encryptedPassword
        })
        const newUser = await user.save()
        response.status(201).json(newUser)
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}


module.exports = { registerNewUser }

//npm install bcryptjs
//npm install jsonwebtoken

//process:
//on signup, password gets encrypted  {by bcrypt.hash(userData.password,10) 10 is a salt number defines the number of shuffles on a hexadecimal number} and then the email is checked in db for existence if not data gets added to db.