import { Router, Request, Response } from "express";
import { userStore, User } from "../models/user";
import createUserVaildate from "../middelware/userMiddelware";
import jsonwebtoken from 'jsonwebtoken';
import jwtMiddelWare from "../middelware/jwtMiddelware";
import loginMiddelWare from "../middelware/loginMiddelWare";

const userRouter = Router()


//get users
userRouter.get("/users",jwtMiddelWare ,async (req: Request, res: Response): Promise<void> => {
    const userModel = new userStore();

    const reslt = await userModel.index();

    res.json(reslt)
    res.end()

})


//create user
userRouter.post("/user",[createUserVaildate],async (req:Request,res:Response):Promise<void> =>{
    // create the user 
    const userModel = new userStore()
    const result = await userModel.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        email:req.body.email
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

 //login
 userRouter.post("/login",loginMiddelWare,async (req:Request,res:Response):Promise<void> => {
    const userModel = new userStore()
    const email:string = req.body.email 
    const password:string = req.body.password 

    const result =  await userModel.login(email,password)
    if(result[0] == true) {
        //create jwt
        const secret:string = process.env.TOKEN_SECRET as string
        console.log(result[1]);
        
        const jwt = jsonwebtoken.sign({user:result[1]},secret)
    res.json(jwt)
    res.end()
    } else {
        res.status(401)
        res.json({
            error : result[1]
        })
        res.end()
    }
 }) 
export default userRouter