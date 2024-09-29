import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Login } from '../components/login/Login'
import { Home } from '../pages/Home/Home'





const router= createBrowserRouter([
    {
        path:'/',
        element: <Login/>
    },
    {
        path:'home',
        element:<Home/>
    },


])

export const MyRoutes = () => {
  return (
    <RouterProvider router={router}  />
  )
}