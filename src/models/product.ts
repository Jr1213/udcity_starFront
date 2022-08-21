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
            const result =  conn.query(query)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`error happend : ${error}`)
        }
    }

    async show(id:number) : Promise<Product> {
        try {
            const conn = await db.connect()
            const query  = 'SELECT * FROM products Where id = $1'
            const result = conn.query(query,[id])
            return result.rows[0]
        } catch (error) {
            throw new Error(`error happend : ${error}`)
        }
    }
}