// src/routes/PublicRoute.jsx
import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }) {
  const { user } = useAuth();  // Obtenha o usuário do contexto de autenticação

  // Se o usuário estiver autenticado, redirecione para a página principal
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
