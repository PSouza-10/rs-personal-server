import { Router } from 'express'

import contentRoutes from './content'
import userRoutes from './user'
import formRoutes from './forms'

const router = Router()

router.use('/content', contentRoutes)
router.use('/account', userRoutes)
router.use('/forms', formRoutes)

export default router
