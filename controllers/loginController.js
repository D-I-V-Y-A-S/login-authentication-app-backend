const userModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'bhbgcvxcexefvtyhniknuvy'

const loginExistingUser = async (request,response)=>{
    const {email , password} = request.body
    try{
        const validUser = await userModel.findOne({email:email})
        if(!validUser){
            return response.status(401).json({message : "Invalid email."})
        }
        if(await bcrypt.compare(password,validUser.password))
        {
            const AUTH_TOKEN = jwt.sign({email : validUser.email}, JWT_TOKEN,{ expiresIn:45})
            return response.status(201).json({token : AUTH_TOKEN, firstName : validUser.firstName, lastName : validUser.lastName})
        }
        response.status(401).json({message : 'Invalid Password'})
    }catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

module.exports = {loginExistingUser}

// process:
//    on login, the email is checked in db if exists we compare the passwords if they match then jwt token gets generated ->refer userDataComponent on frontend

