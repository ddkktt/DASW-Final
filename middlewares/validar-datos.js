// const jwt = require('jsonwebtoken')
const config = require('../config/config.js')

function validarBodyProyecto(req, res, next){
    let {title, description, creationDate, available} = req.body;
    if(title && description && creationDate && available!=undefined){
        next();
        return;
    }

    res.status(400).send({error: "Faltan atributos, revisar"})
}
function validarMensaje(req,res,next){
    let {sender, projectId, content, timestamp} = req.body;
    if(sender&& projectId&& content){
        next()
        return;
    }
    else{
        res.status(400).send({error: "Faltan atributos para el mensaje, revisar"})
    }
}

function validarToken(req, res, next){
    let token = req.get('x-token');
    if(!token){
        res.status(401).send({error: "No autenticado"})
        return;
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) =>{
        if(err) {
            res.status(401).send({error: err.message});
        return;
        }

        
    req.email = decoded.email;
    next();
    })

}

module.exports = {validarBodyProyecto, validarToken, validarMensaje};
