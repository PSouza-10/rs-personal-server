import { Router } from 'express'

import contentRoutes from './content'
import userRoutes from './user'

const router = Router()

router.use('/content', contentRoutes)
router.use('/account', userRoutes)

export default router
