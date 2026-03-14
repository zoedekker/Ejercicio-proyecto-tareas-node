//autenticacion de usuarios, tema de seguridad

import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) =>{
    const token = req.headers.authorization

    if (!token){
        return res.status(401).json({
            message: "Token requerido"
        })
    }

    try {
        const codigo = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = codigo
        next()
    } catch (error) {
        return res.status(403).json({
            message: "token Invalido", error
        })
        
    }

}