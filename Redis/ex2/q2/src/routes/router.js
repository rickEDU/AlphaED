const express = require('express');
const router = express.Router();
const Redis = require('ioredis');
const connection = require('../connection/connection');

const redisClient = new Redis({
    host: '0.0.0.0',
    port: 6379,
});

const getBooks = async (req, res) => {
    const response = {
        message: 'Success',
        status: 200,
        data: {},
        error: null
    };
    
    try {
        const cacheKey = 'Books';
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            response.message = 'Success Redis';
            response.data = JSON.parse(cachedData);
            return res.status(response.status).json(response);
        }
        const query = [
            {
                text: `SELECT * FROM books;`,
                params: []
            }
        ];
        const db_response = await connection.executarQuerys(query);
        if (db_response) {
            await redisClient.set(cacheKey, JSON.stringify(db_response[0].rows), 'EX', 5);
            response.message = 'Success Postgres';
            response.data = db_response[0].rows;
            res.status(response.status).json(response);
        } else {
            throw new Error('Error');
        }
    } catch (error) {
        console.log(error);
        response.message = 'Error!';
        response.status = 500;
        response.error = error.message;
        res.status(response.status).json(response);
    }
};

const postBooks = async (req, res) => {
    const response = {
        message: '',
        status: 200,
        data: null,
        error: null
    };

    try {
        const cacheKey = 'Books';
        const { title } = req.body;
        if (title) {
            const query = [
                {
                    text: `INSERT INTO books (title) values ($1) RETURNING *;`,
                    params: [title]
                }
            ];
            const db_response = await connection.executarQuerys(query);
            if (db_response) {
                await redisClient.del(cacheKey);
                response.message = 'Success';
                response.data = db_response[0].rows[0];
                res.status(response.status).json(response);
            } else {
                throw new Error('Error at insert a book!');
            }
        } else {
            throw new Error('Input Error!');
        }
    } catch (error) {
        response.message = 'Error!';
        response.status = 500;
        response.error = error.message;
        res.status(response.status).json(response);
    }
};

router.get('/books', getBooks);
router.post('/books', postBooks);

module.exports = router;
