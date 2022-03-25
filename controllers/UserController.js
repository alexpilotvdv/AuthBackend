import UserService from "../service/UserService.js";

class UserController {
  async registration(req, res, next) {
    try {
      const {email,password} = req.body
      const userData = await UserService.registration(email,password)
      res.cookie('refreshtoken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {console.log(e)}
  }
  async login(req, res, next) {
    try {
    } catch (e) {}
  }
  async logout(req, res, next) {
    try {
    } catch (e) {}
  }
  async activate(req, res, next) {
    try {
    } catch (e) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }
  async getUsers(req, res, next) {
    try {
    //  const r = await db.findOne('aa@a.com')
    //  console.log(r.length)
      
    } catch (e) {}
  }
}

export default new UserController();
