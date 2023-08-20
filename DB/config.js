const mongoose = require('mongoose');


const DBConnection = async()=> {

    try {

        mongoose.connect( process.env.MONGODB_ATLAS_CNN);

        console.log('Database online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de datos');
    }
} 


module.exports = {
    DBConnection
}