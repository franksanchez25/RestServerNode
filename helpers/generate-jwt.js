
const jwt = require('jsonwebtoken');

const generatejwt =(uid = '') => {

    return new Promise( (resolve, reject)=> {

        const payload = { uid };

        jwt.sign(payload, process.env.PRIVATEKEYJWT,{
            expiresIn:'4h'
        },(error, token)=>{

            if (error){
                console.log(error);
                reject('No se pudo generar token');
            }else{
                resolve(token)
            }
        })
        
    })

}


module.exports = {
    generatejwt
}