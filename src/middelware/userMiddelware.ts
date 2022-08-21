import { Request, Response} from "express";
interface userCreateErrors {
    firstName:string | null,
    lastName:string | null,
    password:string | null
}
const createUserVaildate = (req:Request,res:Response,next:Function):void => {
    //first name exist
    let errors:userCreateErrors = {
        firstName :null,
        lastName : null,
        password : null
    }

    if(!req.body.hasOwnProperty('firstName') || req.body.firstName.length == 0){
        errors.firstName = 'invaild user first name'
    }
    //last name exist

    if(!req.body.hasOwnProperty('lastName') || req.body.lastName.length == 0){
        errors.lastName = 'invaild user last name'
    }
    //password exist

    if(!req.body.hasOwnProperty('password') || req.body.password.length == 0){
        errors.password = 'invaild password'
    }

    if(errors.firstName != null || errors.lastName != null || errors.password != null){
        
        res.status(401)
        res.json(errors)
        res.end()
    }else {
        next()
    }
}

export default createUserVaildate