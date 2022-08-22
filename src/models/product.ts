import db from '../database'

export type Product = {
    id?:number,
    name?:string,
    price?:number
}

export class ProductStore {
    //index
    async index ():Promise<Product[]> {
        try {
            const conn = await db.connect()
            const query = 'SELECT * FROM products;'
            const result = await conn.query(query)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`error happend : ${error}`)
        }
    }

    async show(id:number) : Promise<Product> {
        try {
            const conn = await db.connect()
            const query  = 'SELECT * FROM products Where id = $1;'
            const result = await conn.query(query,[id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`error happend : ${error}`)
        }
    }

    async create(data:Product):Promise<Product[]> {
        try {
        
            const conn = await db.connect()
            const query = 'INSERT INTO products (name,price) VAlUES($1,$2);'
            const result = await conn.query(query,[data.name,data.price]);
            
            
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`unexpexted error : ${error}`)
        }
    }
}