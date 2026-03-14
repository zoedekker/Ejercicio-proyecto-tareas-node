import express from 'express'
import { registrarUsuario, iniciar_Sesion, perfil} from '../controllers/authcontroller.js'
import { verificarToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', registrarUsuario)
router.post('/login', iniciar_Sesion)

router.get('/perfil',verificarToken, perfil)

export default router

