import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Register({ setToken }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const [wiggle, setWiggle] = useState(false); // Controls the wiggle effect

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { firstname, lastname, email, password };

        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                if (result.error && result.error.includes("already exists")) {
                    setErrorMessage("An account with this email already exists.");
                } else {
                    setErrorMessage("Registration failed. Please try again.");
                }

                // Trigger wiggle animation
                setWiggle(true);
                setTimeout(() => setWiggle(false), 500); // Reset after animation
                return;
            }

            setToken(result.token);
            localStorage.setItem("token", result.token);
            navigate("/account");
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            setWiggle(true);
            setTimeout(() => setWiggle(false), 500);
        }
    };

    return (
        <div className="content-card">
            <div className="gradient-border-card">
                <form onSubmit={handleSubmit}>
                    <label>First Name
                        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                    </label>
                    <label>Last Name
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    </label>
                    <label>Email
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>Password
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    {errorMessage && (
                        <p className={`error-message ${wiggle ? 'wiggle' : ''}`}>{errorMessage}</p>
                    )}
                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
