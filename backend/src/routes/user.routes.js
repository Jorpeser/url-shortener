// Routes for user entity

import { Router } from 'express'
import { getUsers, createNew } from '../controllers/user.controller.js'

const router = Router()

router.get('/user', getUsers)
router.post('/user', createNew)

export default router