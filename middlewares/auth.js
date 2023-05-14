function authStrict(req, res,next){
    let header = req.get("x-auth")
    if(header){
        if(header == "12345"){
            next()
        }else{
            res.status(401).send({error: "No eres administrador"})
        }
    }else{
        res.status(403).send({error: " Faltan permisos, no tienes token"})
    }
}

// function validateAdmin(req,res, next){
//     let header = req.get("x-auth")
//     if(header && header=="12345"){
//         req.isAdmin = true;
//     }else{
//         req.isAdmin= false;
//     }
//     next();
// }

function validateCreator(req, res,next){
    let header = req.get("x-creator")
    if(header){
        if(header == "12345"){
            next()
        }else{
            res.status(401).send({error: "No eres administrador"})
        }
    }else{
        res.status(403).send({error: " Faltan permisos, no tienes token"})
    }
}

//module.exports = {authStrict, validateAdmin}

module.exports = {authStrict, validateCreator}