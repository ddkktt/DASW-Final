
const router  = require('express').Router();
const {User} = require('../db/User.js');
const jwt = require('jsonwebtoken')
const config = require('../config/config.js');
//login
router.post('/', async (req, res)=>{
    console.log("hey");
    console.log(req.body);
    let user = await User.getUserByEmail(req.body.email);
    if(! user){
        res.status(401).send({error: "Usuario no existente"})
        return;
    }

   
    console.log("user");
    console.log(user);
    //TODO: comparar usando bcrypt
    if(user.password != req.body.password){
        res.status(401).send({error: "usuario o contraseña inválidos"})
        return;
    }
    let token = jwt.sign({email: user.email},
                         config.jwtSecret,
                         { expiresIn: 60 * 3 },)
   console.log(token);
   

    res.send({token})
    
})

module.exports = router;
