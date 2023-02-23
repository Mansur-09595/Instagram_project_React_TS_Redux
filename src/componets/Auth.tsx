import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import "../styles/Login.css"

interface AuthProps {
    children: any
}

const Auth:React.FC<AuthProps> = ({ children }) => {

    const location = useLocation()

    const { token } = useAppSelector(state => state.admin.currentUser)
    
    if (!token) {
        return <Navigate to="/login" state={{ from: location }}/>
    }

    return children
}

export default Auth;