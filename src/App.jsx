import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ConfirmEmail from './pages/ConfirmEmail'
import Profile from './pages/Profile'
import ProtectedRoute from './utils/ProtectedRoutes';
import InsertOtp from './pages/InsertOtp'
import ResetPassword from './pages/ResetPassword'
import GuestRoutes from './utils/GuestRoutes'
import Users from './pages/Users'
function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />

                    <Route path='/Users' element={<Users/>}/>

                    {/* session-expired */}
                    
                    <Route path='/session-expired' element={
                        <GuestRoutes>
                            <h1>Hello from session Expired</h1>
                        </GuestRoutes>} 
                    />


                    <Route path='/unauthorized' element={
                            <GuestRoutes>
                                <h1>Hello from Unauthorized</h1>
                            </GuestRoutes>
                        } 
                    />
                    <Route path='/login' element={
                        <GuestRoutes>
                            <Login />
                        </GuestRoutes>
                        } 
                    />

                    <Route path='/ConfirmEmail' element={
                        <ConfirmEmail />
                        } 
                    />
                    <Route path='/InsertOtp' element={
                        <GuestRoutes>
                            <InsertOtp />
                        </GuestRoutes>
                        } 
                    />
                    <Route path='/ResetPassword' element={

                        <GuestRoutes>
                            <ResetPassword />
                        </GuestRoutes>
                    } />
                    
                    {/* authenticated */}
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    } />
                    {/* authenticated */}
                </Routes>
            </Router>
        </>
    )
}

export default App
