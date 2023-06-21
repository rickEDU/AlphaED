const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');

const getBooks = async (req, res) => {
    const response = {
        message: 'Success',
        status: 200,
        data: {},
        error: null
    };
    
    try {
        const query = [
            {
                text: `SELECT * FROM books;`,
                params: []
            }
        ];
        const db_response = await connection.executarQuerys(query);
        if (db_response) {
            response.message = 'Success';
            response.data = db_response[0].rows; 
            res.status(response.status).json(response);
        } else {
            throw new Error('Error');
        }
    } catch (error) {
        response.message = error;
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
