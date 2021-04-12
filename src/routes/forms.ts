import { Router } from 'express'
import FormController from '../controller/FormController'

const router = Router()
const controller = new FormController()
router.get('/:type', controller.getForms)

export default router
