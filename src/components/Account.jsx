import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Account() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]); // New state for filtered reservations

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getReservations();
  }, []);

  async function getUser() {
    fetch(API_URL + "/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
      })
      .catch(console.error);
  }

  async function getReservations() {
    fetch(API_URL + "/api/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setReservations(result.reservation);
        setFilteredReservations(result.reservation); 
      })
      .catch(console.error);
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  function returnBook(bookId) {
    fetch(API_URL + "/api/reservations/" + bookId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.deletedReservation) {
          getReservations(); // Refresh the reservations list after returning a book
        }
      })
      .catch(console.error);
  }

  function filterBooks(text) {
    if (text === "") {
      // If the search text is empty, reset to the original reservations list
      setFilteredReservations(reservations);
    } else {
      // Filter the reservations based on the search text
      const filtered = reservations.filter((book) =>
        book.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredReservations(filtered);
    }
  }

  return (
    <div className="content-card">
      <section>
        <h3>
          Name:{" "}
          <span>
            {user?.id} {user?.firstname} {user?.lastname}
          </span>{" "}
        </h3>
        <p>
          Email: <span>{user?.email}</span>
        </p>
        <button onClick={logout} className="button secondary-btn">
          Log out
        </button>
      </section>
      <div className="search">
        <input
          onChange={(e) => filterBooks(e.target.value)}
          type="text"
          placeholder="Search for a Book!"
        />
      </div>
      <section className="feature-grid">
        {filteredReservations?.map((book) => (
          <li key={book.id} className="feature-card">
            <h5>{book.title}</h5>
            <img src={book.coverimage} alt={book.title} /> <br />
            <p>{book.author}</p>
            <button onClick={() => returnBook(book.id)} className="button primary-btn">
              Return Book
            </button>
          </li>
        ))}
      </section>
    </div>
  );
}

export default Account;