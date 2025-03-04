import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [wiggle, setWiggle] = useState(false); // Controls the wiggle effect

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };

    fetch(API_URL + "/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.name === "IncorrectCredentialsError") {
          setError(result.message);

          // Trigger wiggle animation
          setWiggle(true);
          setTimeout(() => setWiggle(false), 500); // Reset after animation
          return;
        }

        if (result.token) {
          setToken(result.token);
          localStorage.setItem("token", result.token);
          navigate("/account");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setWiggle(true);
        setTimeout(() => setWiggle(false), 500);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        {error && <p className={`error-message ${wiggle ? 'wiggle' : ''}`}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
