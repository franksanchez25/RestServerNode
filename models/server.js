const express = require('express')
var cors = require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;     
        this.userPath = '/api/user'   
        //Middlewares
        this.middlewares();
        
        this.routes();
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

    }
    
    listenPort(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto:', this.port)
        })
    }

}



module.exports = Server;
