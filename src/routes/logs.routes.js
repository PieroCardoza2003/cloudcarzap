import { Router } from 'express'
import { create_log } from '../controllers/logs.controllers.js'

const router = Router()

router.post('/register', create_log)

export default router