import React from 'react'
import { useEffect } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
export default function GuestRoutes({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const userLocal  = JSON.parse(localStorage.getItem('user'));

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
    }, []);

    if(isLoading){
        return (
            <div className="card h-screen flex items-center">
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
    )
    }
    if (isAuthenticated) {
        return <Navigate to="/profile" />;
    }

    return children;
}
