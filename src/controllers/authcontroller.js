import usuarios from "../models/model.usuarios.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registrarUsuario = async (req, res)=>{
    try {
        const {usuario, nombre, email, password} = req.body //deconstruimos lo que viene de usuarios
        const existe = await usuarios.findOne({ email })

        if (existe){
            return res.status(400).json({
                message: "Usuario Registrado"
            })
        }

        const hash = await bcrypt.hash(password, 10) //ENCRIPTA LA CONTRAASEÑA

        // EJEMPLO: contra: zoe123 = $2a$10$fur0FstSgILOemDzSAYIqumgMk.Ly1B65EOk2FtGhvcK4RvuF2JTO

        const nuevo_usuario = new usuarios({
            usuario,
            nombre,
            email,
            password: hash
        })

        await nuevo_usuario.save()

        res.status(201).json({
            message: "Usuario Registrado correctamente"
        })

    } catch (error) {
        res.status(500).json({
            message: "Error de registro en servidor",error
        })
    }
}

export const iniciar_Sesion = async (req, res)=>{
    try{
        const {usuario, nombre, email, password }= req.body
        const exist = await usuarios.findOne({email})

        if(!exist){
            return res.status(401).json({
                message: "Usuario No encontrado"
            })
        }
        const existe = await bcrypt.compare(password, usuarios.password)

        if(!existe){
            return res.status(401).json({
                message: "Contraseña Invalida"
            })
        }

        const token = jwt.sync(
            {id: usuario._id},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        )
        res.status(200).json({
            message: "Inicio de Sesión exitoso",
            token
        })
    }catch(error){
        response.status(500).json({
            message: "error", error 
        })

    }
    
}

export const perfil = (req, res)=>{
    res.json({
        message: "autenticado",
        usuario: req.usuario
    })

}