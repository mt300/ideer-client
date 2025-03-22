// src/context/AuthContext.js
import {  useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
// export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken")??"";  // Ou use sessionStorage ou cookies

    if (token) {
      
      // Verificar a sessão no backend com o token
      fetch(`${import.meta.env.VITE_BACKEND_URL}/session`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`  // Enviando o token no cabeçalho
        },
        credentials: "include"
      })
        .then(res => res.json())
        .then((data) => {
          console.log('Auth Provider Data:', data);
          if (data.user) setUser(data.user);  // Se o token for válido, define o usuário
        })
        .catch((err) => {
          console.log(err)
          setUser(null)
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);  // Se não houver token, também define o loading como false
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}