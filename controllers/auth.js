const {request, response} = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user/user');
const { generatejwt } = require('../helpers/generate-jwt');



const login = async (req = request, res = response) => {

    const { email, password } = req.body;


    try {
   
        const userExists = await User.findOne({email});

        if (!userExists) {
            
            return res.status(404).json({
                msg: 'Email or passoword are wrong - Email'
            })
        }

         if (!userExists.state) {
            
            return res.status(404).json({
                msg: 'Email or passoword are wrong - State: false'
            })
        }
  
       
        const validPassword = bcrypt.compareSync( password, userExists.password);
        
        
        if (!validPassword) {
            return res.status(400).json({
               msg: 'Email or passoword are wrong - Password'
            }    );
        }
        

        const token = await generatejwt(userExists.id);

        
        res.json({
           userExists,
           token
        })

    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Something wrong'
        })
    }
}



module.exports = {
    login
}