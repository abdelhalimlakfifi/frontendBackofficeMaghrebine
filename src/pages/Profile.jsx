import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Profile() {
    const {error, user} = useSelector((state) => state.user);
    
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const getProfile = async () => {

            try {
                const token = JSON.parse(localStorage.getItem('user')).token
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setLoading(false)
            } catch ({response}) {
                localStorage.removeItem('user')
                if(response.status == 401){
                    if(response.data.error === "Token has expired"){
                        navigate('/session-expired')
                    }else{
                        navigate('/Unauthorized')
                    }
                }
            }

        }

        getProfile();
    });

    return (
        <>
            {loading ? (
                <div className="card h-screen flex items-center">
                    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            ) : (
                <div>
                    <h1>Profile</h1>
                {/* Render profile content here */}
                </div>
            )}
        </>
    )
}