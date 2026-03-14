import express from 'express' //framework para trabajar peticiones
import tareas from '../models/models.tarea.js' //importamos el modelo de bd

const router = express.Router() //permite usar metodos

//middleware

const obtenertarea = async (req, rest, next)=>{
    let tarea;
    const { id } = req.params
    if (!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({ message: 'Id no válido' })
    }
    try {
        tarea = await tareas.findById(id);
        if(!tarea){
            return res.status(404).json({
                message: 'Tarea no encontrada' //error por si no hay una tarea con el ID que se digita
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener la tarea", error //error por si no hay una tarea en general con ese ID en toda la BD
        })
    }

    rest.tarea=tarea
    next()
}

//Creamos la ruta para obtener una tarea por id ^^^^
router.get('/:id', obtenertarea, async(req, res)=>{
    res.json(res.tarea)
})



//ruta para obtener todas las tareas Metodo (GET)

router.get('/', async(req, res)=> {
    try{
        const item= await tareas.find();
        res.status(200).json(item) //decimos que nos muestre la tarea en un formato JSON
    }catch(error){
        res.status(500).josn({
            message: error.message
        })
    }
})

//ruta para crear una nueva tarea (POST)

router.post('/', async(req, res)=>{
    try{
        const nueva_tarea = new tareas(req.body)
        await nueva_tarea.save();
        res.status(201).json(nueva_tarea)

    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})

//await solo funciona con el async
router.put('/:id', async (req,res)=>{
    try{

        const actualizar_tarea = await tareas.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(actualizar_tarea)
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})

//determina que solo cambia UN ASPECTO
router.patch('/:id', obtenertarea, async (req,res)=>{
    try{

        const actualizar_dato = await tareas.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(actualizar_dato)
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }    
})


router.delete('/:id', async(req, res)=>{
    try {
        await tareas.findByIdAndDelete(req.params.id)
        res.status(200).json()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
})

export default router
