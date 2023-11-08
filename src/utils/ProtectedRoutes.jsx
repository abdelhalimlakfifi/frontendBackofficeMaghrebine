import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ProgressSpinner } from 'primereact/progressspinner';


const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {

        const userLocal  = JSON.parse(localStorage.getItem('user'))
        // const vare = import.meta.env
        // console.log(vare);
        try {
            if(userLocal){
                setIsAuthenticated(true)
            }else{
                setIsAuthenticated(false)
            }

            
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false); // Set loading to false after the request is completed
        }

    },[])
    if (isLoading) {
        // Display a loader or any loading indicator
        return (
                <div className="card h-screen flex items-center">
                    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
    
}



export default ProtectedRoute;