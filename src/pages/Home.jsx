import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Home() {

  const {loading, error, user} = useSelector((state) => state.user)

  return (
    <div>

      {user !== null ? (
        <div>
          <Link to="/profile" >Profile</Link>
        </div>
      ):(
        <Link to="/login">Login</Link>
      )}
    </div>
  )
}
