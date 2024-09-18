import { OpenAI } from "openai";
import  Express  from "express";
import pkg from "pg"
import dotenv from "dotenv"

// Load environment variables
dotenv.config();

const {Pool} = pkg
const app = Express();

const pool = new Pool({
    user: process.env.DB_DEV_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DATABASE_DEV,
    password: process.env.DB_DEV_PASSWORD,
    port: process.env.DB_DEV_PORT
    
})


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "text-davinci-003"
});
pool.connect((err, client, release)=> {
    if(err){
        console.error("cannot connect to db", err.stack)
        process.exit(1);  
    }else{
        console.log("Datase connected...")

        client.query("SELECT NOW()", (err, result)=>{
            release();
            if(err){
                console.log("can't query db")
            }else{

                console.log("DB queried", result.rows[0])   
                app.listen(9000, ()=> {
                    console.log("Server is running .....")
                })
            }
        })
    }
})


