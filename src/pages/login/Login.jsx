import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
   const  navigate = useNavigate();

    const handleSiguiente = ()=>{
        navigate('/home');

    }

  return (
   <>
    <h1>Login</h1>
    <button onClick={handleSiguiente} >siguiente</button>
   </>
  )
}
