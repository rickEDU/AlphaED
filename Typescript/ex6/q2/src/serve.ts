import { config } from 'dotenv';
config();
import { App } from './app';

new App().server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na em http://${process.env.HOST}:${process.env.PORT}`)
})
