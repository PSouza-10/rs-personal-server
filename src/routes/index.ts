import { Router } from 'express'

import contentRoutes from './content'

const router = Router()

router.use('/content', contentRoutes)

export default router
