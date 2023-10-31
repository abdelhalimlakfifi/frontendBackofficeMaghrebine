import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProtectedRoute from './utils/ProtectedRoutes';

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
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
