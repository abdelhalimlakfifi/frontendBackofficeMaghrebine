import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const {user} = useSelector((state) => state);
    let location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {

        async function checkAuth(){
            const user  = JSON.parse(localStorage.getItem('user'))
    
            try {
                const response = await axios.get('http://localhost:3000/api/checkAuth',{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
    
                if(response.status === 200 && response.data.authenticated)
                {
                    console.log("from true");
                    setIsAuthenticated(true)
                }else{
    
                    console.log("from false");
                    setIsAuthenticated(false)
                }
                
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false); // Set loading to false after the request is completed
            }
            
        }

        checkAuth();

    },[])
    if (isLoading) {
        // Display a loader or any loading indicator
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        console.log("===================================");
        console.log(isAuthenticated);
        return <Navigate to="/login" />;
    }

    return children;
    
}



export default ProtectedRoute;