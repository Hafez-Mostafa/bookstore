import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectionDB } from './db/connectionDB.js';
import bookRoute from './src/modules/books/book.route.js';
import authorRoute from './src/modules/authors/author.route.js';

// Initialize dotenv
dotenv.config();

// Set up express app
const app = express();

// Configure CORS
const corsConfig = {
    origin: "*",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

// Connect to the database
connectionDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/books', bookRoute);
app.use('/authors', authorRoute);

// Catch-all for 404 errors
app.get('*', (req, res) => res.status(404).json({ msg: "Page Not Found on 3000" }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server app listening on PORT ${PORT}!`));
