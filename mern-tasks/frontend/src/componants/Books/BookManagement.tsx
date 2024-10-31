import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', year: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/books/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      if (Array.isArray(data.statusCode)) {
        setBooks(data.statusCode);
      } else {
        throw new Error('Books data is not an array');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBookById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/books/books/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book');
      const data = await response.json();
      setSelectedBook(data.statusCode);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/books/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error('Failed to update book');
      await response.json();
      fetchBooks(); // Refresh the book list after updating
      setShowUpdateModal(false);
      setSelectedBook(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/v1/books/books/${id}`, {
        method: 'DELETE',
      });
      fetchBooks(); // Refresh the book list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setShowUpdateModal(true);
  };

  const handleModalClose = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setSelectedBook(null);
    setNewBook({ title: '', author: '', genre: '', year: '' });
  };

  const handleUpdate = () => {
    if (selectedBook) {
      updateBook(selectedBook._id, selectedBook);
    }
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/books/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) throw new Error('Failed to add book');
      await response.json();
      fetchBooks(); // Refresh the book list after adding
      handleModalClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Book Manager</h1>
      <Button className='btn btn-primary mb-3' onClick={() => setShowAddModal(true)}>Add Books</Button>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.year}</td>
              <td>
                <Button className='m-1' onClick={() => handleUpdateClick(book)}>Update</Button>
                <Button className='m-1' onClick={() => deleteBook(book._id)}>Delete</Button>
                <Button className='m-1' onClick={() => getBookById(book._id)}>Get Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating book */}
      <Modal show={showUpdateModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <div>
              <label>
                Title:
                <input
                  type="text"
                  value={selectedBook.title}
                  onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                />
              </label>
              <br />
              <label>
                Author:
                <input
                  type="text"
                  value={selectedBook.author}
                  onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                />
              </label>
              <br />
              <label>
                Genre:
                <input
                  type="text"
                  value={selectedBook.genre}
                  onChange={(e) => setSelectedBook({ ...selectedBook, genre: e.target.value })}
                />
              </label>
              <br />
              <label>
                Year:
                <input
                  type="text"
                  value={selectedBook.year}
                  onChange={(e) => setSelectedBook({ ...selectedBook, year: e.target.value })}
                />
              </label>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding new book */}
      <Modal show={showAddModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Title:
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
          </label>
          <br />
          <label>
            Author:
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
          </label>
          <br />
          <label>
            Genre:
            <input
              type="text"
              value={newBook.genre}
              onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            />
          </label>
          <br />
          <label>
            Year:
            <input
              type="Date"
              value={newBook.year}
              onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBook}>
            Add Book
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display selected book details */}
      {selectedBook && !showUpdateModal && (
        <div>
          <h2>Selected Book</h2>
          <p>ID: {selectedBook._id}</p>
          <p>Title: {selectedBook.title}</p>
          <p>Author: {selectedBook.author}</p>
          <p>Genre: {selectedBook.genre}</p>
          <p>Year: {selectedBook.year}</p>
        </div>
      )}
    </div>
  );
};

export default BookManager;
