import { useState } from "react";
import { Menu, X } from "lucide-react"; // Ícones para abrir/fechar menu
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const logout = () => {
    // Faz logout do usuário
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  }
  const menuItems = () => {
    if (loading) return <p>Carregando...</p>;
    if (user) {
      return (
        <ul className="flex flex-col lg:flex-row gap-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Gerar Ideias</Link>
          </li>
          <li>
            <Link to="/my-ideas" className="hover:text-gray-300">Suas Ideias</Link>
          </li>
          <li>
            <Link to="/all-ideas" className="hover:text-gray-300">Ideias de Outros</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-300">Perfil</Link>
          </li>
          <li>
            <Link onClick={logout} className="hover:text-gray-300">Sair</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex flex-col lg:flex-row gap-4">
          <li>
            <Link to="https://landing.com.br" className="hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-300">Registrar</Link>
          </li>
        </ul>
      );
    }
  }
  return (
    <header className="fixed top-0 left-0 w-full z-50  text-white p-4 flex justify-between items-center">
      {/* Logo e título */}
      <div id="page-title" className="flex items-center gap-3">
        <img src="/ideer-logo-no-text.png" alt="Vite Logo" className="w-12 h-12" />
        {/* <h1 className="text-xl font-bold">Ideer</h1> */}
        <button className="button" data-text="Awesome">
          <span className="actual-text">&nbsp;Ideer&nbsp;</span>
          <span aria-hidden="true" className="hover-text">&nbsp;Ideer&nbsp;</span>
      </button>
      </div>

      {/* Botão do menu em Mobile */}
      <button
        className="lg:hidden block p-2 text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu de navegação */}
      <nav
        className={`lg:flex items-center gap-6 ${
          menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-gray-900 p-4" : "hidden"
        } lg:static lg:flex-row lg:bg-transparent lg:p-0`}
      >
        {menuItems()}
        {/* <ul className="flex flex-col lg:flex-row gap-4">
          <li>
            <a href="/" className="hover:text-gray-300">Gerar Ideias</a>
          </li>
          <li>
            <a href="/my-ideas" className="hover:text-gray-300">Suas Ideias</a>
          </li>
          <li>
            <a href="/all-ideas" className="hover:text-gray-300">Ideias de Outros</a>
          </li>
          <li>
            <a href="/profile" className="hover:text-gray-300">Perfil</a>
          </li>
            <a href="/help" className="hover:text-gray-300">Ajuda</a>
          <li>
          </li>
        </ul> */}
      </nav>
    </header>
  );
}
