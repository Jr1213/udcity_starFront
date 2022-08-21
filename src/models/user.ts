import db from "../database";
import bcrypt from 'bcrypt';

export type User = {
    id?:number,
    firstName?:string,
    lastName?:string
    password?:string

}

export class userStore {

    //show all users
    async index():Promise<User[]> {
        try {
            const conn = await db.connect()
            const query:string = 'SELECT * FROM users;'
            const reslt = await conn.query(query)
            conn.release()
            return reslt.rows

        }catch  (err) {
            throw new Error(`faild to connect to database : ${err}` )
        }
    }

    //create user 
    async create(info:User):Promise<[string , boolean]>{
        try {
            const query:string = "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3);"
            const conn = await db.connect();
            const pepper:string = (process.env.BCRYPT_PASSWORD as unknown) as string
            const soldRound:string = (process.env.SALT_ROUNDS as unknown) as string 

            const hashed = bcrypt.hashSync(
                info.password + pepper ,parseInt(soldRound)
            )
            const res = await conn.query(query,[info.firstName,info.lastName,hashed])
            console.log(res.rows);
            conn.release()
            
            
            return ["new user has been added" ,true]

        }catch (err){
            throw new Error(`unexpected error happend : ${err}`)
            
        }
    }

    // show user by id 
    async show(id:number):Promise<User> {
        try {
            const conn = await db.connect()
            const qurey ='SELECT * FROM users WHERE id = $1'
            const result = await conn.query(qurey,[id])
            
            
            return result.rows

        } catch (error) {
            throw new Error(`unexpected error happend : ${error}`)
        }
    }
}