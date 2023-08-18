const { response, request } = require ('express');

const getUser = (req = request, res = response)=> {

    const {q,apikey} = req.query;

    res.json({
        msg: 'Get Response from api - controlled',
        q,apikey

        })
}

const postUser = (req, res)=> {
    const {nombre, apellido} = req.body;
        res.status(201).json({
            msg: 'Post Response from api - controlled',
            nombre, apellido    
        })

}

const putUser = (req, res)=> {

        const {id} = req.params;

        res.json({
            msg: 'Put Response from api - controlled!!',
            id
        });
        
}

const deleteUser = (req, res)=> {
        res.json({
            msg: 'Delete Response from api - controlled'
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