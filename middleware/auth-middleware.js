import ApiError from "../exception/api-error.js"
import TokenService from "../service/TokenService.js"
const authMw = (req,res,next)=>{
try{
const authHeader = req.headers.authorization
if(!authHeader){
    return next(ApiError.unautorisedError())
}
const accesstoken = authHeader.split(' ')[1]
if(!accesstoken){
    return next(ApiError.unautorisedError())
}
const userData = TokenService.validateAccessToken(accesstoken)
if(!userData){
    return next(ApiError.unautorisedError())
}
req.user = userData
next()

}
catch(e){
    return next(ApiError.unautorisedError())
}

}
export default authMw