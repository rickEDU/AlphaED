import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { router } from './router/router';


export class App{
    public server: express.Application;

    constructor(){
        this.server = express()
        this.midware()
    }

    private midware(){
        this.server.use(cors({origin:true, credentials:true}))
        this.server.use(express.json())
        this.server.use(cookieParser())
        this.server.use(router)
    }
}