const service_session = require('../service/session')
const jwtLib = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const TAG = '/CONTROLER:'

exports.post_session = async (req, res) =>{
    const response = {
        menssage:"",
        code: null,
        data: null,
        error: null
    }

    try{
        const {email, senha} = req.body
        const user =  await service_session.service_post_session(email)
        const result = await bcrypt.compare(senha, user.senha);
        if(result !== true){
            throw 'Senha incorreta'
        }
        const jwt = jwtLib.sign( {user: user}, process.env.JWTSECRET)
        response.menssage = 'Sucess'
        response.code = 200
        response.data = user
        res.cookie("session", jwt, {maxAge: 300000})
        res.status(200).json(response)
    }catch(error){
        console.log(TAG, 'post', error)
        response.menssage = 'Internal error'
        response.code = 401
        response.error = error
        res.status(401).json(response)
    }
}
exports.authenticate = async (req, res, next) => {
    try {
        if(req.cookies.session == undefined){
            throw 'Usuário não está logado'
        }
        const decodedJwt = jwtLib.verify(req.cookies.session, process.env.JWTSECRET);
        req.user = decodedJwt.user
        return next();
    } catch (error) {
        const response = {
            message: "",
            code: null, 
            data: null,
            error: null,
        };
        console.log("Middleware", error);
        response.message = "Erro interno do Servidor";
        response.code = 403;
        response.data = null;
        response.error = error;
        res.status(403).json(response);
    }
}

exports.protected = (req, res) => {
    return res.json({ 
        message: "Success",
        code: 200,
        data: {user: req.user},
        error: null });
};

exports.logout =  (req, res) => {
    return res
      .clearCookie('session')
      .status(200)
      .json({
        message: "Successfully logged out",
        code: 200,
        data: null,
        error: null });
};