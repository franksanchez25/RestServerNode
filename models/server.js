const express = require('express');
var cors = require('cors');
const {DBConnection} = require('../DB/config.js');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;     
        this.userPath = '/api/user';
        this.authPath = '/api/auth';   
        //Connect DB
        this.DBConnect();
        //Middlewares
        this.middlewares();
        
        this.routes();
    }

   async DBConnect() {

    await DBConnection();

    }

    middlewares() {
        //cors
        this.app.use( cors() );

        //Read parse json
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );
    }


    routes(){
        
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.authPath, require('../routes/auth.js'));

    }
    
    listenPort(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto:', this.port)
        })
    }

}



module.exports = Server;