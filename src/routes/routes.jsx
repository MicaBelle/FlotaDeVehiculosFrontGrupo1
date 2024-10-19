import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Login } from '../components/login/Login'
import { Home } from '../pages/Home/Home'
import RutaProtegida from './RutaProtegida'

const router= createBrowserRouter([
    {
        path:'/',
        element: <Login/>
    },
    {
        path:'home',
        element: (
          <RutaProtegida>
            <Home />
          </RutaProtegida>
        )
    },


])

export const MyRoutes = () => {
  return (
    <RouterProvider router={router}  />
  )
}