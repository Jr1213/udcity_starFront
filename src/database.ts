import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
    
const {
    POSTGRES_HOST ,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB 
} = process.env

const ENV = process.env.ENV
console.log(ENV);

// any till we choose if env is test or dev
let db:any;

if(ENV === 'test'){
    db = new Pool({
            host:POSTGRES_HOST,
            password:POSTGRES_PASSWORD,
            user:POSTGRES_USER,
            database:POSTGRES_TEST_DB
        })
}


if(ENV === 'dev'){
    db = new Pool({
            host:POSTGRES_HOST,
            password:POSTGRES_PASSWORD,
            user:POSTGRES_USER,
            database:POSTGRES_DB
        })
}


export default db