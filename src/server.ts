import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRouter from './api/userRoutes'
import productRouter from './api/productRoute'


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/',async function (req: Request, res: Response) {
   
    
    res.send("hello")
})

app.use('/',userRouter)
app.use('/',productRouter)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
