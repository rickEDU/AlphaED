const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWD,
    port: process.env.PG_PORT,
})

module.exports = pool;

// const teste = ()=>{
//     pool.query('SELECT * FROM produtos;', (err, res) => {
//         console.log(res.rows)
//         pool.end()
//     })
// }

// teste()

// pool.query('SELECT * FROM produtos;', (err, res) => {
//     console.log(res.rows)
//     pool.end()
// })
 

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'eCommerce',
//     password: 'paladinsoul',
//     port: 5432,
// })
// client.connect()
 
// client.query('SELECT * FROM produtos;', (err, res) => {
//     console.log(err, res)
//     client.end()
// })