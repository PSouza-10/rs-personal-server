import { Router } from 'express'
import ContentController from '../controller/ContentController'

const router = Router()
const controller = new ContentController()
router.get('/', controller.get)
router.get('/:id', controller.getOne)

export default router
