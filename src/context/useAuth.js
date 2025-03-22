// src/context/useAuth.js
import { useContext } from "react";
// import {AuthProvider} from "./AuthProvider"; // Agora você importa o AuthContext aqui
import { AuthContext } from "./AuthContext";

export function useAuth() {
    // console.log('AuthProvider',useContext(AuthContext));
    return useContext(AuthContext)??{user:null,loading: true}; // E retorna o contexto de autenticação	
}
