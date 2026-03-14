// //creamos el esquema de nuestra base de datos
// import mongoose from "mongoose";


import mongoose from "mongoose";


//definimos el modelo (la tabla)
const tareaschema = new mongoose.Schema(
    {
        titulo:  {type: String, required: true}, 
        descripcion: {type: String, required: true},
        estado: {type: String, default:"pendiente"},
        fecha_asignacion: {type: Date, default:Date.now}

    }
)

//creamos el modelo basado en el schema
const tareas = mongoose.model('tarea', tareaschema)

// //este que exporto es el que usare en mis rutas para luego obtener la informacion


export default tareas