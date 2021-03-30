import { Router } from 'express'
import UserController from '../controller/UserController'
import { auth } from '../middleware'

const router = Router()
const controller = new UserController()
router.post('/', controller.register, controller.sendConfirmationEmail)
router.get('/confirmEmail/:token', controller.confirmEmail)
router.post('/login', controller.login)
router.get('/', auth, controller.refresh)

export default router
