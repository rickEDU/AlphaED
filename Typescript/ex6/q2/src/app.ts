import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

export class App{
    public server: express.Application;

    constructor(){
        console.log('Deu certo!')
        this.server = express()
        this.midware()
    }

    private midware(){
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use(cookieParser())
        this.server.use(express.static('./public'))
    }
}