import { Router, Request, Response } from "express";
import { userStore, User } from "../models/user";
import createUserVaildate from "../middelware/userMiddelware";
import jsonwebtoken from 'jsonwebtoken';
import jwtMiddelWare from "../middelware/jwtMiddelware";

const userRouter = Router()


//get users
userRouter.get("/users",jwtMiddelWare ,async (req: Request, res: Response): Promise<void> => {
    const userModel = new userStore();

    const reslt = await userModel.index();

    res.json(reslt)
    res.end()

})


//create user
userRouter.post("/user",[createUserVaildate,jwtMiddelWare],async (req:Request,res:Response):Promise<void> =>{
    // create the user 
    const userModel = new userStore()
    const result = await userModel.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    }) 

    //return response
    const secret:string = process.env.TOKEN_SECRET as string
    const jwt = jsonwebtoken.sign({user:result[0]},secret)
    res.json(jwt)
    res.end()

})


userRouter.get("/user/:id",jwtMiddelWare,async (req:Request,res:Response):Promise<void> => {
    
    
    const userModel = new userStore()
    const id:number = parseInt(req.params.id as string)
    const result = await userModel.show(id)

    res.json(result)
    res.end()
})


export default userRouter