import express from 'express'
import {config} from 'dotenv'
import router from './routes/tarea.routes.js'
import cors from 'cors' //para poder peticiones desde cualquier navegador al backend (npm i cors)
import { conectar } from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url' //importo para contener ruta de archivo actual //file://c:Users\ZKMA
import authroutes from './routes/auth.routes.js'
// import {env} from 'env-var'

config()

const app = express()
app.use(cors())
app.use(express.json()) //middleware que permite parsear JSON en las solicitudes entrantes

// const port = process.env.PORT


conectar()


//convierte la ruta del archivo en una ruta que entiende el sistema operativo
const __filename = fileURLToPath(import.meta.url) //c:user/Mirafrlores7
const __dirname = path.dirname(__filename)

console.log(path.join((__dirname),'../public'))


app.use('/api/tarea', router)
app.use('/api', authroutes)

app.use(express.static(path.join(__dirname, "../public"))) //Por defecto el navegador siempre busca el index.html para pagina principal






//Para subirlo a vercel no es necesario que lo subamos por uno de nuestros puertos

// app.listen(port, ()=>{
//     console.log(`saliendo por el puerto ${port}`)
// })

export default app;
