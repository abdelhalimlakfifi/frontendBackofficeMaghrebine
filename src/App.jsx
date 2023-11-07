import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ConfirmEmail from './pages/ConfirmEmail'
import Profile from './pages/Profile'
import ProtectedRoute from './utils/ProtectedRoutes';
import InsertOtp from './pages/InsertOtp'
import ResetPassword from './pages/ResetPassword'

function App() {

    return (
        <div className='!font-plusjakarta'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/ConfirmEmail' element={<ConfirmEmail />} />
                    <Route path='/InsertOtp' element={<InsertOtp />} />
                    <Route path='/ResetPassword' element={<ResetPassword />} />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default App
