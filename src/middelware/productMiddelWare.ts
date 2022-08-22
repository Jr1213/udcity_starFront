import { Request, Response} from "express";

const productMiddelWare = (req:Request,res:Response,next:Function):void => {
    const {name , price} = req.body
    let error:null | string = null
    
    if(name == null || price == null || isNaN(price) || name.length == 0){
        error = 'invaild'
    }else {
        error = null
    }

    if(error == null) {
        next()
    }else {
        res.status(401)
        res.json({error : error})
        res.end()
    }
}

export default productMiddelWare