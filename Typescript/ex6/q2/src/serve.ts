import { App } from './app';
import { config } from 'dotenv';

config();

new App().server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na em http://${process.env.HOST}:${process.env.PORT}`)
})
