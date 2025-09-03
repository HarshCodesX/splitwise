import React from 'react'
import {Navigate} from "react-router-dom"

//protected routes for authorized actions
const ProtectedRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if(!isLoggedIn){
        return <Navigate to="/" replace />
    }
    return children
}

export default ProtectedRoute