import db from "../database";
import bcrypt from 'bcrypt';

export type User = {
    id?:number,
    firstName?:string,
    lastName?:string
    password?:string,
    email?:string

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
            const query:string = "INSERT INTO users (firstname, lastname, password, email) VALUES ($1, $2, $3,$4);"
            const conn = await db.connect();
            const pepper:string = (process.env.BCRYPT_PASSWORD as unknown) as string
            const soldRound:string = (process.env.SALT_ROUNDS as unknown) as string 

            const hashed = bcrypt.hashSync(
                info.password + pepper ,parseInt(soldRound)
            )
            const res = await conn.query(query,[info.firstName,info.lastName,hashed,info.email])
            
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
            const qurey ='SELECT * FROM users WHERE id = $1;'
            const result = await conn.query(qurey,[id])
            
            
            return result.rows

        } catch (error) {
            throw new Error(`unexpected error happend : ${error}`)
        }
    }

    //login with user
    async login(email:string,password:string):Promise<[boolean , User | string]> {
        try {
            const conn = await db.connect()
            const query = 'SELECT * FROM users WHERE email = $1'
            const result = await conn.query(query,[email])
            console.log(result);
            
            let data:[boolean , User | string] = [false,'invlaild email or password']

            const pepper:string = (process.env.BCRYPT_PASSWORD as unknown) as string
            const check = bcrypt.compareSync(password+pepper, result.rows[0].password)
            if(result.rowCount == 0) {
                data = [false,'invlaild email or password'] 
            }
            if(check == true) {
                data = [check,result.rows[0]]
            } else {
                [check,'invlaild email or password']
            }
            return data
        } catch (error) {
            return [false,'invlaild email or password']
        }
    }
}