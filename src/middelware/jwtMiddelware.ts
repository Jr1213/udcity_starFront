import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
const jwtMiddelWare = (req:Request,res:Response, next:Function) : void => {
    const secret:string = process.env.TOKEN_SECRET as string 
    try {
        jsonwebtoken.verify(req.headers.token as string,secret)
        next();

    } catch (err) {
        
        res.json({error:`invilad token ${err}`})
        res.end()
        return
    }
    
    
    
}

export default jwtMiddelWare