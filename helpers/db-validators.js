
const Role = require('../models/role/role')
const User = require('../models/user/user');



        const isValidRole = async (role = '' )=>{
                    const roleExist = await Role.findOne({ role });
                    if (!roleExist) {
                        throw new Error(`The role ${role} not valid`)                        
                    }
        }
        
        const mailExist = async ( email = '' ) => {

             const emailExist = await User.findOne({ email });
                if (emailExist){
                   
                    throw new Error(`The email ${email} already exists`);
                }
        }


           const existUserById = async ( id  ) => {

             const userExist = await User.findById(id);
                if (!userExist){
                   
                    throw new Error(`The id: ${id} not exists`);
                }
        }





    module.exports = {
    isValidRole,
    mailExist,
    existUserById

    }

