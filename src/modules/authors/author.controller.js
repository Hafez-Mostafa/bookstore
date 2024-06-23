
import { GiConsoleController } from 'react-icons/gi';
import authorModel from '../../../db/models/author.model.js'
import bookModel from '../../../db/models/book.model.js'
import moment from 'moment'

import { ObjectId } from 'mongodb';

export const getAuthor = async (req, res, next) => {
    try {
        const Authors = await authorModel.find()
        res.status(201).json({ message: 'Authors', Authors })
    } catch (error) {
        res.status(500).json({ error: error })
        next(error)
    }
}

export const newAuthor = async (req, res, next) => {
    // Destruct title, content, and author from the request body
    const { name, bio, birthDate, books } = req.body;
    try {
        // Check if a Author with the same title and author already exists
        const existsAuthor = await authorModel.findOne({ name });
        if (existsAuthor) {
            // If the Author already exists, return a 300 status with a message
            return res.status(409).json({ message: 'This Author already exists ' });
        }
        // Create a new Author with the provided title, content, and author
        const author = await authorModel.create({
            name, bio, birthDate, books
        });

        // Check if the Author creation was successful
        if (!author) {
            // If no Author was created, return a 500 status with a message
            return res.status(500).json({ message: 'No Data Saved' });
        }

        // If the Author was successfully created, return a 201 status with the Author data
        res.status(201).json({ message: 'Authors Page', author });
    } catch (error) {
        // If an error occurs, return a 500 status with the error message
        res.status(500).json({ error: error.message });
        // Pass the error to the next middleware
        next(error);
    }
};


// Function to update a Author by its ID
export const updateAuthor = async (req, res, next) => {
    // Extracting title, content, and author from the request body
    const { name, bio, birthDate, books } = req.body;
    // Extracting the Author ID from the request parameters
    const { id } = req.params;

    try {
        // Validate the provided ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Author ID' });
        }

        // Find the Author by ID
        const existId = await authorModel.findById(id);

        // If the Author is not found, return a 404 status with a message
        if (!existId) {
            return res.status(404).json({ message: 'This Author ID is not available' });
        }

        // Update the Author with the new title, content, and author
        const updatedAuthor = await authorModel.updateOne({_id: id },
            { bio, birthDate, books }
        );

        // If the update fails, return a 500 status with a message
        if (updatedAuthor.modifiedCount == 0) {
            return res.status(500).json({ message: 'Failed to update Author' });
        }

        // Return a 200 status with a success message and the updated Author
        return res.status(200).json({ message: 'Author updated successfully!', updatedAuthor });

    } catch (error) {
        // If there's an error, return a 500 status with the error message
        res.status(500).json({ error: error.message });
        // Pass the error to the next middleware
        next(error);
    }
};


// Function to delete a Author by its ID
export const deleteAuthor = async (req, res, next) => {
    // Extracting the Author ID from the request parameters
    const { id } = req.params;

    try {
        // Validate the provided ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Author ID' });
        }

        // Find the Author by ID
        const existId = await authorModel.findById(id);

        // If the Author is not found, return a 404 status with a message
        if (!existId) {
            return res.status(404).json({ message: 'This Author ID is not available' });
        }

        // Delete the Author 
        const deletedAuthor = await authorModel.deleteOne(
            { _id: new ObjectId(id) }
        );

        // If the delete fails, return a 500 status with a message
        if (!deletedAuthor) {
            return res.status(500).json({ message: 'Failed to Delete Author' });
        }

        // Return a 200 status with a success message and the updated Author
        return res.status(200).json({ message: 'Author deltetd successfully!', deleteAuthor });

    } catch (error) {
        // If there's an error, return a 500 status with the error message
        res.status(500).json({ error: error.message });
        // Pass the error to the next middleware
        next(error);
    }
};



// Add pagination to the GET endpoints for retrieving all books and authors.

// export const getBooksAuthors = async (req, res, next) => {

//     const { name } = req.body
//     try {
//         const authors = await authorModel.find({}, 'name bio -_id')
//             .populate(
//                 'books'
//             ).populate(
//                 '','title'

//             );

//         // console.log(authors);

//         res.status(201).json({ message: 'Books', authors })
//     } catch (error) {
//         res.status(500).json({ error: error })
//         next(error)
//     }
// }
export const getBooksAuthors = async (req, res, next) => {
    const { author } = req.params;

    try { 
        // Find the author and populate the books
        const authors = await authorModel.find().populate({
            path: 'books._id',
            model: 'Book',
            select: 'title content -_id', // Adjust the fields you want to populate
        });
        if (!authors) {
            return res.status(404).json({ message: 'Author not found' });
        }
       
        
        res.status(201).json({ message: 'Success',authors})
    } catch (error) {
        console.error('Error in getAuthorWithBooks:', error);
        res.status(500).json({ error: error.message });
        next(error);
    }
};

// Implement search functionality to filter
// books by title or author, and authors by name or bio.
export const getByQuery = async (req, res, next) => {
    const { title, name, author, bio } = req.query; // Destructure title, name, author, and bio from req.query

    try {
        // Find books based on query parameters
        const books = title ? await bookModel.find({ title }) :
            author ? await bookModel.find({ author }) : null;

        // Find authors based on query parameters
        const authors = name ? await authorModel.find({ name }) :
            bio ? await authorModel.find({ bio }) : null;

        // Return response with books and authors found
        return res.status(200).json({ message: 'Success', books, authors });
    } catch (error) {
        // Handle errors
        console.error('Error in getByQuery:', error);
        res.status(500).json({ error: error.message });
        next(error); // Pass the error to the next middleware
    }
};