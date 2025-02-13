import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/authContext';
import Login from './screens/login';
import Dashboard from './screens/dashboard';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("aqui", isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const {login} = useContext(AuthContext);

  useEffect(() => {
    // Verificar si hay un token guardado en localStorage
    const token = localStorage.getItem('token');
    console.log('token', token)
    if (token) {
      login(token);
    }
  }, [login]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;