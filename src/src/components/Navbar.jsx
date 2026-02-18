import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const logoUrl = "https://i.imgur.com/nYzYxzn.png";

  const theme = {
    primary: "bg-[#1B3A57]",
    lightBg: "bg-[#FDFBF7]",
  };

  const getLinkClass = (path, hash = "") => {
    const base = "hover:text-red-300 transition cursor-pointer";
    const isActive = location.pathname === path && location.hash === hash;
    return isActive ? "text-red-300 border-b-2 border-red-300 pb-1" : base;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${theme.primary} shadow-lg py-2`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div
            className="bg-white transition-all duration-300 shadow-md flex items-center justify-center overflow-hidden w-10 h-10 p-0.5 rounded-b-xl rounded-t-sm"
          >
            <img
              src={logoUrl}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className="font-serif font-bold text-white tracking-wide transition-all duration-300 text-lg"
          >
            U.E.N José Ángel Álamo
          </span>
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex gap-8 text-white text-sm font-medium tracking-wider items-center">
          <Link to="/" className={getLinkClass("/")}>
            INICIO
          </Link>
          <Link to="/blogs" className={getLinkClass("/blogs")}>
            BLOG
          </Link>
          <Link to="/tramites" className={getLinkClass("/tramites")}>
            TRÁMITES Y DESCARGAS
          </Link>
          <Link to="/contacto" className={getLinkClass("/contacto")}>
            CONTACTO
          </Link>
        </div>

        {/* Botón Movil */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu movil */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${theme.primary} absolute top-full left-0 w-full border-t border-blue-800 shadow-xl`}
        >
          <div className="flex flex-col p-6 space-y-4 text-white text-center">
            <Link to="/" className="py-2 hover:bg-blue-800 rounded">
              INICIO
            </Link>
            <Link to="/blogs" className="py-2 bg-blue-800 rounded">
              BLOG
            </Link>
            <Link to="/tramites" className="py-2 bg-blue-800 rounded">
              TRÁMITES
            </Link>
            <Link to="/contacto" className="py-2 bg-blue-800 rounded">
              CONTACTO
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;