import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Lock } from 'lucide-react'; 

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#112233] text-gray-400 py-12 border-t border-red-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg shadow-md h-16 w-16 flex items-center justify-center">
              <img 
                src="https://i.imgur.com/1tbjjyM.png" 
                alt="Escudo" 
                className="w-full h-auto object-contain" 
              />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif font-bold text-lg">U.E.N José Ángel Álamo</h4>
              <p className="text-xs uppercase tracking-widest text-gray-500">Desde 1967, educando para la vida.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <a 
              href="https://www.facebook.com/groups/11153488515/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-red-500 transition transform hover:scale-110"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>

        {/* Sección inferior con Copyright y acceso Admin oculto */}
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} U.E.N José Ángel Álamo. Todos los derechos reservados.</p>
          
          {/* Enlace para Admin */}
          <Link 
            to="/login" 
            className="flex items-center gap-1 mt-4 md:mt-0 hover:text-red-400 transition-colors opacity-50 hover:opacity-100"
            title="Acceso Administrativo"
          >
            <Lock size={10} />
            <span>Intranet</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;