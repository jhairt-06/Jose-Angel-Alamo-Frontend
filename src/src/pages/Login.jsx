import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Upload,
  LogOut,
  Plus,
  Bell,
  User,
 ArrowLeft,
  Loader2
} from "lucide-react";

import NewsManager from "../components/NewsManager";
import FilesManager from "../components/FilesManager";
import { API_URL } from "../config";

const theme = {
  primary: "bg-[#1B3A57]",
  primaryText: "text-[#1B3A57]",
  bgLight: "bg-[#FDFBF7]",
};

const logoUrl = "https://i.imgur.com/1tbjjyM.png";

const SchoolAdmin = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("dashboard");

  // Verificar si hay sesión al cargar
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) setToken(storedToken);
  }, []);

  // Función de Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // Si no hay token, mostrar Login
  if (!token) {
    return <AdminLogin onLogin={(newToken) => {
        localStorage.setItem("adminToken", newToken);
        setToken(newToken);
    }} />;
  }

  // Interfaz de Administrador
  return (
    <div className={`flex h-screen ${theme.bgLight} font-sans`}>
      {/* SIDEBAR */}
      <aside className={`w-64 ${theme.primary} text-white flex flex-col shadow-2xl`}>
        <div className="p-6 flex flex-col items-center border-b border-blue-900">
          <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain mb-3 bg-white rounded-full p-1" />
          <h2 className="font-serif font-bold text-lg tracking-wide">Panel Administrativo</h2>
          <p className="text-xs text-blue-200">U.E.N José Ángel Álamo</p>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-4">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Vista General" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarItem 
            icon={<Bell size={20} />} 
            text="Noticias y Anuncios" 
            active={activeTab === "news"} 
            onClick={() => setActiveTab("news")} 
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            text="Gestión de Archivos" 
            active={activeTab === "files"} 
            onClick={() => setActiveTab("files")} 
          />
        </nav>

        <div className="p-4 border-t border-blue-900">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-blue-900 rounded transition-colors"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center px-8">
          <h2 className={`text-2xl font-serif font-bold ${theme.primaryText}`}>
            {activeTab === "dashboard" && "Bienvenido, Administrador"}
            {activeTab === "news" && "Gestor de Noticias"}
            {activeTab === "files" && "Archivos y Planillas"}
          </h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <div className="w-8 h-8 rounded-full bg-[#1B3A57] text-white flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 pr-2">Director</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" && <DashboardHome changeTab={setActiveTab} />}
          {/* Se pasa el token a los componentes hijos para que puedan subir cosas */}
          {activeTab === "news" && <NewsManager token={token} />}
          {activeTab === "files" && <FilesManager token={token} />}
        </div>
      </main>
    </div>
  );
};


/* --- COMPONENTE DE LOGIN  --- */
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const response = await fetch(`${API_URL}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            onLogin(data.token);
        } else {
            setError("Credenciales incorrectas. Verifique usuario y contraseña.");
        }
    } catch (err) {
        setError("Error de conexión con el servidor.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.primary} relative overflow-hidden`}>
       <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
       
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <img src={logoUrl} alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h2 className={`text-3xl font-serif font-bold ${theme.primaryText}`}>Acceso Administrativo</h2>
        </div>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Usuario</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[#1B3A57] outline-none transition-all"
              placeholder="Ej: admin"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[#1B3A57] outline-none transition-all"
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full ${theme.primary} hover:bg-[#132a40] text-white font-bold py-3 rounded transition shadow-lg flex justify-center items-center`}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Iniciar Sesión"}
            </button>

            {/* BOTÓN PARA VOLVER AL INICIO */}
            <a 
              href="/" 
              className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#1B3A57] text-sm font-medium py-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Volver a la página principal
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const DashboardHome = ({ changeTab }) => {
    return (
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-900 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase">Gestión</p>
              <h3 className="text-xl font-bold text-gray-800">Panel Activo</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full text-blue-900"><Bell size={24}/></div>
          </div>

        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-6 border-b pb-2">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div onClick={() => changeTab("news")} className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center hover:bg-blue-50 transition">
                    <Plus size={32} className="text-blue-900 mb-2"/>
                    <h4 className="font-bold">Nueva Noticia</h4>
                </div>
                <div onClick={() => changeTab("files")} className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center hover:bg-red-50 transition">
                    <Upload size={32} className="text-red-600 mb-2"/>
                    <h4 className="font-bold">Subir Archivo</h4>
                </div>
            </div>
        </div>
      </div>
    );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1
      ${active ? "bg-white/10 text-white font-bold border-l-4 border-[#C62828]" : "text-blue-100 hover:bg-white/5"}
    `}
  >
    {icon}
    <span className="tracking-wide text-sm">{text}</span>
  </button>
);

export default SchoolAdmin;