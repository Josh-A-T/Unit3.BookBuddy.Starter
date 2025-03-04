/* TODO - add your code to create a functional React component 
that renders a navigation bar for the different views in your single 
page application. You may consider conditionally rendering some options - 
for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import { NavLink } from "react-router-dom";

function Navigations({ token }) {
  return (
    <nav className="navbar-top">
        <div className="navbar-top-content">
        📚 BookBuddy
          <div className="nav-top-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Books</NavLink>
          {token ? (
            <NavLink to="/account">Account</NavLink>
        ) : (
          <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
          </>
        )}
          </div>
        </div>
      </nav>


  );
}

export default Navigations;
