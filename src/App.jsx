// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import './App.css';
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";  // Importando o PublicRoute
import Home from './pages/Home';
import UserIdeas from './pages/UserIdeas';
import AllIdeas from './pages/AllIdeas';
import Profile from './pages/Profile';
import Buy from './pages/Buy';
import Login from './pages/Login';  // Supondo que você tenha uma página de login
import Register from './pages/Register';  // E uma página de registro
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/all-ideas" element={<AllIdeas />} />
          
          {/* Páginas privadas com autenticação */}
          <Route 
            path="/" 
            element={<PrivateRoute><Home /></PrivateRoute>} 
          />
          <Route 
            path="/my-ideas" 
            element={<PrivateRoute><UserIdeas /></PrivateRoute>} 
          />
          <Route 
            path="/profile" 
            element={<PrivateRoute><Profile /></PrivateRoute>} 
          />
          <Route 
            path="/buy" 
            element={<PrivateRoute><Buy /></PrivateRoute>} 
          />
          
          {/* Páginas públicas de login/registro */}
          <Route 
            path="/login" 
            element={<PublicRoute><Login /></PublicRoute>} 
          />
          <Route 
            path="/register" 
            element={<PublicRoute><Register /></PublicRoute>} 
          />
        </Routes>
      </main>
    </Router>
    </AuthProvider>
  );
}

export default App;
