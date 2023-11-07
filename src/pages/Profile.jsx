import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Profile() {
    const {loading, error, user} = useSelector((state) => state.user)
    return (
      <div>
  
        {user !== null ? (
          <div>
            <h1>{user.user.first_name + ' ' + user.user.first_name}</h1>
            <h1>{user.user.email}</h1>
            <Link to="/" >Home</Link>
          </div>
        ):(
          <Link to="/login">Login</Link>
        )}
      </div>
    )
  }