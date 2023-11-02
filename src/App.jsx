import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ConfirmEmail from './pages/ConfirmEmail'
import Profile from './pages/Profile'
import ProtectedRoute from './utils/ProtectedRoutes';
import InsertOtp from './pages/InsertOtp'

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/ConfirmEmail' element={<ConfirmEmail />} />
                    <Route path='/InsertOtp' element={<InsertOtp />} />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </>
    )
}

export default App
