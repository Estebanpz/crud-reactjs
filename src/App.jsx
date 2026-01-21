import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RootRoute from "./routes/RootRoute.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import StoreProvider from "./context/StoreContext.jsx";
function App() {
  return (
    <>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <Routes>
              {/* Root Route - Validates user and redirects */}
              <Route path="/" element={<RootRoute />} />

              {/* Routes publics */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </>
  );
}

export default App;
