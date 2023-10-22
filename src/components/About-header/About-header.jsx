import React from 'react';
import { Link } from 'react-router-dom';




export default function AboutHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Trello
      </Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/about">
          About
        </Link>
        <Link className="nav-link" to="/login">
          Sign In
        </Link>
        <Link className="nav-link">
          <button className="btn btn-primary">
            <Link to="/register" className="btn-link text-black">
              Sign Up
            </Link>
          </button>
        </Link>
      </div>
    </div>
  </nav>

  )
}
