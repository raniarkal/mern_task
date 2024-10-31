import BookModel from "../model/BookModel.js";
import { ApiResponse } from '../utility/ApiResponse.js';
import { ApiError } from '../utility/ApiErrors.js';
import { asyncHandler } from '../utility/AsyncHandler.js';

// Create a new book
const uploadBooks = asyncHandler(async (req, res) => {
    const { title, author, genre, year } = req.body;
    const newBook = await BookModel.create({ title, author, genre, year });
    res.status(201).json(new ApiResponse(newBook, "Book created successfully"));
});

// Get all books
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await BookModel.find();
    res.status(200).json(new ApiResponse(books, "Books retrieved successfully"));
});

// Get a book by ID
const getBookById = asyncHandler(async (req, res) => {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    res.status(200).json(new ApiResponse(book, "Book retrieved successfully"));
});

// Update a book by ID
const updateBook = asyncHandler(async (req, res) => {
    const { title, author, genre, year } = req.body;
    const book = await BookModel.findByIdAndUpdate(
        req.params.id,
        { title, author, genre, year },
        { new: true, runValidators: true }
    );
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    res.status(200).json(new ApiResponse(book, "Book updated successfully"));
});

// Delete a book by ID
const deleteBook = asyncHandler(async (req, res) => {
    const book = await BookModel.findByIdAndDelete(req.params.id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }
    res.status(200).json(new ApiResponse(book, "Book deleted successfully"));
});


// Export all controller methods
export {
    uploadBooks,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
