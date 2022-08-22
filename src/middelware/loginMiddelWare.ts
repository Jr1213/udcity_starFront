import { Request, Response} from "express"


const loginMiddelWare = (req:Request,res:Response, next:Function):void => {
    const {email,password} = req.body 

    if(!email || !password) {
        res.status(401)
        res.json({
            error: "plase enter email and password"
        })
        res.end()
    }else {
        next()
    }
}

export default loginMiddelWare