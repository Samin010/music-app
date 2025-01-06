import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getAllUsers } from '../controllers/user.controller.js'

const router=express.Router()

router.get('/',protectRoute,getAllUsers)

export default router