/* TODO - add your code to create a functional React component that displays 
all of the available books in the library's catalog. Fetch the book data from the 
provided API. Users should be able to click on an individual book to navigate to 
the SingleBook component and view its details. */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Books() {
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    fetch(API_URL + "/api/books", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const availableBooks = result.books.filter(
          (book) => book.available === true
        );
        setBooks(availableBooks);
        setAvailableBooks(availableBooks);
      })
      .catch(console.error);
  }


  return (
    <div className="content-card">
      <h2>Available Books</h2>
      <div className="feature-grid">
        {books.map((book) => (
          <div className="feature-card" key={book.id}>
            
            <h3> <Link to={`/books/${book.id}`}>
                <img src={book.coverimage} alt={book.title} /> <br />
                {book.title}</Link></h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
