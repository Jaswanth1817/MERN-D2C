import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from 'antd';

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('userid');

  if(!token) {
    return <Navigate to='/signup' />
  }

  return (
    <div>
      <h1>Home, {id}</h1>
      <Button
        type="primary"
        onClick={() => {
          localStorage.clear();
          navigate('/signup');
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Home