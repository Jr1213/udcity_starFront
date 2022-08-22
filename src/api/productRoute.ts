import { Router,Request,Response } from "express";
import jwtMiddelWare from "../middelware/jwtMiddelware";
import productMiddelWare from "../middelware/productMiddelWare";
import { Product, ProductStore } from "../models/product";

const productRouter = Router()

const productModel = new ProductStore()

//get all products 
productRouter.get("/products",async (req:Request,res:Response):Promise<void> => {
    const result = await productModel.index()

    res.json(result)
    res.end()
})


//create product
productRouter.post("/product",[jwtMiddelWare,productMiddelWare],async (req:Request,res:Response):Promise<void> => {
    const data:Product = {
        name:req.body.name,
        price:req.body.price
    }

    const result = await productModel.create(data)
    console.log(result);
    
    res.json({status:'product has been created'})
    res.end()
})

//show product by id
productRouter.get("/product/:id",async (req:Request,res:Response):Promise<void> =>{
    const id:number = parseInt(req.params.id as string)
    const result = await productModel.show(id)

    res.json(result)
    res.end()
})


export default productRouter