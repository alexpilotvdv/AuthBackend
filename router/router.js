import { Router } from "express"
import PostController from "../PostController.js"
const router =new Router
import UserController from '../controllers/UserController.js'
router.post('/registration',UserController.registration)
router.post('/login', UserController.login)
router.post('/logout',UserController.logout)
router.get('/activation/:link',UserController.activate)
router.get('/refresh',UserController.refresh)

router.get('/users',UserController.getUsers)
export default router