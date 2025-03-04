import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function SingleBook({ token }) {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getBook();
  }, [id]);

  async function getBook() {
    fetch(API_URL + "/api/books/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBook(result.book);
      })
      .catch(console.error);
  }

  async function checkoutBook() {
    fetch(API_URL + "/api/books/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        available: false,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.book) {
          navigate("/account");
        }
      })
      .catch(console.error);
  }

  return (
    <div className="content-card">
      <h2>
        {book?.title} { token && <span>Available</span> }
      </h2>
      <h3>By: {book?.author}</h3>
      <p><img src={book?.coverimage} alt={book?.title} className="bookcover" />
      {book?.description}</p>
      { token && <button onClick={checkoutBook} className="button primary-btn">Check out Book</button> }
    </div>
  );
}

export default SingleBook;
