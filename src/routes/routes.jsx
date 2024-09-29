import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Login } from '../pages/login/Login'
import { Home } from '../pages/Home/Home'
import { VerDetalleColectivo } from '../components/VerDetalleColectivo'




const router= createBrowserRouter([
    {
        path:'/',
        element: <Login/>
    },
    {
        path:'home',
        element:<Home/>
    },
    {
      path: 'ver-detalle',
      element: <VerDetalleColectivo/>
    }

])

export const MyRoutes = () => {
  return (
    <RouterProvider router={router}  />
  )
}