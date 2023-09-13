

const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name:{
        type:String,
        required: [true,'Name is required']
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
     img:{
        type: String
    },
     role:{
        type: String,
        required: [true,'Role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE','SALES_ROLE']
    },
    state:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }

});

userSchema.methods.toJSON = function() {
    const { __v,password, _id, ...users } = this.toObject();
    
    users.uid = _id;
    return users;
}



module.exports = model( 'User',userSchema );