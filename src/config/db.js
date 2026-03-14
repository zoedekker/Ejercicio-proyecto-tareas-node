import mongoose from "mongoose";
import {config} from "dotenv"

config()

const db_url= process.env.DB_URL

//Conexion con mongoose

export const conectar = async() => {
    try{
        await mongoose.connect(db_url)
        console.log('conexion a la base de datos exitosa')
    }catch (error){
        console.log('No se pudo conectar a la base de datos')
    }
}

