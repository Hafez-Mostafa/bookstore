import bookModel from '../../../db/models/book.model.js'
import authorModel from '../../../db/models/author.model.js'

import { ObjectId } from 'mongodb';

export const getBook = async (req, res, next) => {
    try {
        const books = await bookModel.find()
        res.status(201).json({ message: 'Books Page ', books })
    } catch (error) {
        res.status(500).json({ error: error })
        next(error)
    }
}

export const newBook = async (req, res, next) => {
    // Destruct title, content, and author from the request body
    const { title, content, authorId } = req.body;
    try {
        // Check if the author exists
        const existsAuthor = await authorModel.findById(authorId);
        if (!existsAuthor) {
            return res.status(404).json({ message: 'Author is Unknown' });
        }

        // Check if a book with the same title by the same author already exists
        const existstitle = await bookModel.findOne({ title, authorId });
        if (existstitle) {
            return res.status(409).json({ message: 'This Book already exists for the same Author' });
        }

        // Create a new book with the provided title, content, and author
        const book = await bookModel.create({ title, content, authorId });

        // Update the author's book list
        await authorModel.updateOne({ _id: authorId }, { $push: { books: { _id: book._id, title: title } } });

        // If the book was successfully created, return a 201 status with the book data
        res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
        // If an error occurs, return a 500 status with the error message
        res.status(500).json({ error: error.message });
        // Pass the error to the next middleware
        next(error);
    }
}


// Function to update a book by its ID
export const updateBook = async (req, res, next) => {
    // Extracting title, content, and author from the request body
    const { title, content, authorId } = req.body;
    // Extracting the book ID from the request parameters
    const { id } = req.params;

    try {
        // Validate the provided ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        // Find the book by ID
        const existId = await bookModel.findById(id);

        // If the book is not found, return a 404 status with a message
        if (!existId) {
            return res.status(404).json({ message: 'This Book ID is not available' });
        }

        // Update the book with the new title, content, and author
        const updatedBook = await bookModel.updateOne(
            { _id: id },
            { title, content, authorId }
        );

        // If the update fails, return a 500 status with a message
        if (updatedBook.modifiedCount == 0) {
            return res.status(500).json({ message: 'Failed to update Book' });
        }

        // Return a 200 status with a success message and the updated book
        return res.status(200).json({ message: 'Book updated successfully!', updatedBook });

    } catch (error) {
        // If there's an error, return a 500 status with the error message
        res.status(500).json({ error: error.message });
        // Pass the error to the next middleware
        next(error);
    }
};


// Function to update a book by its ID
export const deleteBook = async (req, res, next) => {
    // Extracting the book ID from the request parameters
    const { id } = req.params;

    try {
        // Validate the provided ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        // Find the book by ID
        const existId = await bookModel.findById(id);

        // If the book is not found, return a 404 status with a message
        if (!existId) {
            return res.status(404).json({ message: 'This Book ID is not available' });
        }

        // Delete the book 
        const deletedBook = await bookModel.deleteOne(
            { _id: id }
        );

        // If the delete fails, return a 500 status with a message
        if (!deletedBook) {
            return res.status(500).json({ message: 'Failed to Delete Book' });
        }

        // Return a 200 status with a success message and the updated book
        return res.status(200).json({ message: 'Book deltetd successfully!', deleteBook });

    } catch (error) {
        // If there's an error, return a 500 status with the error message
        res.status(500).json({ error: error.message });
        // Pass the error to the next middleware
        next(error);
    }
};
