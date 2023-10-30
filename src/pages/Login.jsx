import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    // react states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    // redux state
    const {loading, error} = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginEvent = (e) => {
        e.preventDefault();
        let userCredentials = {
            username, password
        }

        dispatch(loginUser(userCredentials)).then((result) => {

            console.log(result);
            if(result.payload){
                setUsername('')
                setPassword('')
                navigate('/')
            }
        });
    }
    return (
        <form className='' onSubmit={handleLoginEvent}>
            <label htmlFor="">E-mail</label>
            <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label htmlFor="">Password</label>
            <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button type='submit'>
                {loading ? 'Loading...': 'Login'}
            </button>
            { error && (
                <div>{error}</div>
            ) }
        </form>
    ) 
}
