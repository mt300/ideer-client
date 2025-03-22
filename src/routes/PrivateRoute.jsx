import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  console.log('PrivateRoute',user,loading);
  if (loading) return <p>Carregando...</p>; 
  return user ? children : <Navigate to="/login" />;
}
