import ApiError from "../exception/api-error.js";
const mwErr = (err,req,res,next)=>{
if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
}
return res.status(500).json({message: 'Непредвиденная ошибка'})
}
export default mwErr