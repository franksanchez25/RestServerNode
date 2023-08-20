const { response, request } = require ('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user/user.js');




const getUser = async (req = request, res = response)=> {
    const { limit = 10, from = 0  } = req.query;
    const queryFilterActiveUser = {state: true}
    

    const [total, allUsers] = await Promise.all([
                User.countDocuments(queryFilterActiveUser),
                User.find(queryFilterActiveUser)
                .limit(Number(limit))
                .skip(Number(from))
    ]); 
    
    res.json({
        // q,apikey
       total,
        allUsers


        });
}

const postUser = async (req, res)=> {

    const { name, email, password, role }= req.body;
    const user = new User({name, email,password,role});

    //Verificar si correo existe

    
    //Encriptar constrasena

    const salt = bcryptjs.genSaltSync(10);

    user.password = bcryptjs.hashSync( password,salt );
    


    await user.save();

        res.status(201).json({
            user
        })

}

const putUser = async (req, res) => {

        const {id} = req.params;

        const {_id, password, google, mail, ...userModelToUpdate} = req.body;

        if (password) {
            const salt = bcryptjs.genSaltSync(10);
            userModelToUpdate.password = bcryptjs.hashSync( password,salt );
        }

        const userUpdated = await User.findByIdAndUpdate( id, userModelToUpdate );

        
        res.json({
            userUpdated
        });
        
}

const deleteUser = async (req, res) => {

    const { id } = req.params;


    //delete fisicamente

        // const userDeletedID = await User.findByIdAndDelete( id );

        const disableUser = await User.findByIdAndUpdate(id, {state: false});

        res.json({
            // id
            disableUser
        })
        
}
const patchUser = (req, res = response)=> {
    res.json({
        msg: 'Get Response from api - controlled'
        })
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser
};