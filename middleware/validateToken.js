
const {request,response} = require('express')
const jwt = require('jsonwebtoken')


const User = require('../models/user/user.js');

const validateToken = async (req = request, res = response, next ) => {

   const token =  req.header('x-token');
   
   if (!token) {
       return res.status(401).json({
        msg: 'Token required'
       })
    }

    try {
        
    const {uid} = jwt.verify( token ,process.env.PRIVATEKEYJWT);

    const userAuth = await User.findById(uid);

    if (!userAuth) {
         res.status(401).json({
            msg:'Invalid token - user: not found'
        })
    }

    if (!userAuth.state) {
        res.status(401).json({
            msg:'Invalid token - status: false'
        })
    }

    req.user = userAuth;
    next();
    
} catch (error) {

        console.log(error)
        res.status(401).json({
            msg: 'Invalid token'
        })

    }

    console.log(token);
}


module.exports = {
    validateToken
}