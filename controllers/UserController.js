import UserService from "../service/UserService.js";
import { validationResult } from "express-validator";
import ApiError from "../exception/api-error.js";
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return next(ApiError.badRequest('Ошибка при валидации',errors.array()))
      }
      const {email,password} = req.body
      const userData = await UserService.registration(email,password)
      res.cookie('refreshtoken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {next(e)}
  }
  async login(req, res, next) {
    try {
      const {email,password} = req.body
      const userData = await UserService.login(email,password)
      res.cookie('refreshtoken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {next(e)}
  }
  async logout(req, res, next) {
    try {
      const {refreshtoken} = req.cookies
      const token = await UserService.logout(refreshtoken)
      res.clearCookie('refreshtoken')
      return res.json(token)
    } catch (e) {next(e)}
  }
  async activate(req, res, next) {
    try {
      const activationlink = req.params.link
      await UserService.activate(activationlink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {next(e)}
  }
  async refresh(req, res, next) {
    try {
      const {refreshtoken} = req.cookies
      const userData = await UserService.refresh(refreshtoken)
      res.cookie('refreshtoken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {next(e)}
  }
  async getUsers(req, res, next) {
    try {
      res.json('Доступ разрешен')
    } catch (e) {}
  }
}

export default new UserController();
