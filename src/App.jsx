import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import ConfirmEmail from "./pages/Auth/ConfirmEmail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoutes";
import InsertOtp from "./pages/Auth/InsertOtp";
import ResetPassword from "./pages/Auth/ResetPassword";
import GuestRoutes from "./utils/GuestRoutes";
import Users from "./pages/users/Users";
import CategoriesAndSubCategories from "./pages/CategoriesAndSubCategories/CategoriesAndSubCategories";
import Types from "./pages/types/Types";
import Roles from "./pages/Roles/Roles";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";

// import Categories from './pages/CategoriesAndSubCategories/Categories'
import ProductStore from "./pages/products/ProductStore";
import ProductList from "./pages/products/ProductList";

import Customers from "./pages/Customers/Customers";
import InfoCustomer from "./pages/Customers/InfoCustomer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* session-expired */}
          <Route
            path="/session-expired"
            element={
              <GuestRoutes>
                <h1>Hello from session Expired</h1>
              </GuestRoutes>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <GuestRoutes>
                <h1>Hello from Unauthorized</h1>
              </GuestRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoutes>
                <Login />
              </GuestRoutes>
            }
          />
          <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
          <Route
            path="/InsertOtp"
            element={
              <GuestRoutes>
                <InsertOtp />
              </GuestRoutes>
            }
          />
          <Route
            path="/ResetPassword"
            element={
              <GuestRoutes>
                <ResetPassword />
              </GuestRoutes>
            }
          />

          {/* authenticated */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Users */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              // <ProtectedRoute>
              <Customers />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/infoCustomer"
            element={
              <ProtectedRoute>
                <InfoCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filters"
            element={
              <ProtectedRoute>
                <CategoriesAndSubCategories />
              </ProtectedRoute>
            }
          />

          <Route path="/roles" element={<Roles />} />
          <Route
            path="/add-user"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          {/* users */}
          <Route
            path="/filters"
            element={
              <ProtectedRoute>
                <CategoriesAndSubCategories />
              </ProtectedRoute>
            }
          />

          <Route path="/roles" element={<Roles />} />

          <Route
            path="/types"
            element={
              <ProtectedRoute>
                <Types />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/types"
            element={
              <ProtectedRoute>
                <Types />
              </ProtectedRoute>
            }
          />

          {/* ProductList */}
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-store"
            element={
              <ProtectedRoute>
                <ProductStore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* authenticated */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
