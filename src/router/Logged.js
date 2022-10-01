import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'

const Logged = () => {
    const { user } = useContext(AuthContext)



    return user ? <Navigate to ='/' /> : <Outlet />
}

export default Logged