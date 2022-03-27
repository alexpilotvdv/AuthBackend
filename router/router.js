import { Router } from "express"
import authMw from '../middleware/auth-middleware.js'
import PostController from "../PostController.js"
import {body} from 'express-validator'
const router =new Router
import UserController from '../controllers/UserController.js'
router.post('/registration', 
body('email').isEmail(), 
body('password').isLength({min:3,max:20}),
UserController.registration)
router.post('/login', UserController.login)
router.post('/logout',UserController.logout)
router.get('/activation/:link',UserController.activate)
router.get('/refresh',UserController.refresh)
router.get('/users',authMw, UserController.getUsers)
export default router