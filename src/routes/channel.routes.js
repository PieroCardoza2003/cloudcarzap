import { Router } from 'express'
import { unicast_message } from '../controllers/channel.controllers.js'

const router = Router()

router.post('/unicast', unicast_message)

export default router