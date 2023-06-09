import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createComment } from '../controllers/comments.js'

const router = new Router()

//create Comment
//http://localhost:3005/api/comments/:id
router.post('/:id', checkAuth, createComment)

export default router