import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, User, ArrowRight, Filter, GraduationCap } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { API_URL } from "../config";

const NewsListPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Cargar Noticias
      const newsRes = await fetch(`${API_URL}/api/noticias/`);
      const newsData = await newsRes.json();
      setNoticias(newsData);

      // 2. Cargar Categorías (para los botones de filtro)
      const catRes = await fetch(`${API_URL}/api/categorias/`);
      const catData = await catRes.json();
      setCategorias(catData);
      
      setLoading(false);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setLoading(false);
    }
  };

  // HELPER: Limpiar HTML para la vista previa (excerpt)
  const crearResumen = (htmlContent) => {
    if (!htmlContent) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  const formatFecha = (fechaString) => {
    const date = new Date(fechaString);
    return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // LOGICA DE FILTRADO
  const filteredNews = noticias.filter(post => {
    // Buscamos en título o contenido limpio
    const cleanContent = crearResumen(post.contenido).toLowerCase();
    const matchesSearch = post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cleanContent.includes(searchTerm.toLowerCase());
    
    // Filtramos por nombre de categoría
    // Nota: post.categoria_nombre viene del serializer que hicimos antes
    const matchesCategory = selectedCategory === "Todas" || post.categoria_nombre === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const theme = {
    primary: "bg-[#1B3A57]",
    lightBg: "bg-[#FDFBF7]",
  };

  return (
    <div className={`min-h-screen ${theme.lightBg} font-sans text-gray-800`}>
      <Navbar />

      {/* HEADER */}
      <header className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1B3A57]">
            {/* Patrón decorativo opcional */}
            <div className="opacity-10 w-full h-full" style={{backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 mt-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide mb-4">Cartelera Informativa</h1>
          <p className="text-gray-300 font-serif text-lg">Anuncios oficiales y actividades escolares</p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* BARRA DE FILTROS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          
          {/* Botones de Categorías Dinámicos */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Filter size={20} className="text-gray-400 mr-2" />
            
            <button
                onClick={() => setSelectedCategory("Todas")}
                className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${selectedCategory === "Todas" ? "bg-[#1B3A57] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
                Todas
            </button>

            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.nombre)}
                className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat.nombre 
                  ? "bg-[#1B3A57] text-white shadow-md" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar noticia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-[#1B3A57] outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
             <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B3A57] mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando noticias...</p>
             </div>
        )}

        {/* GRILLA DE NOTICIAS */}
        {!loading && (
            filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((post) => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                    
                    {/* Imagen */}
                    <div className="h-56 overflow-hidden relative bg-gray-200">
                        <div className="absolute top-4 left-4 bg-[#1B3A57] text-white text-xs font-bold px-3 py-1 rounded z-10 uppercase shadow-md">
                            {post.categoria_nombre}
                        </div>
                        
                        {post.imagen ? (
                            <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-30">
                                <GraduationCap size={48} />
                            </div>
                        )}
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatFecha(post.fecha_publicacion)}</span>
                        <span className="flex items-center gap-1"><User size={12} /> Admin</span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 group-hover:text-[#C62828] transition-colors leading-tight">
                        {post.titulo}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {crearResumen(post.contenido)}
                    </p>
                    
                    {/* ENLACE AL DETALLE (IMPORTANTE) */}
                    <Link to={`/blogs/${post.id}`} className="mt-auto">
                        <button className="w-full py-3 border-t border-gray-100 text-[#1B3A57] font-bold text-sm uppercase flex items-center justify-center gap-2 group-hover:bg-[#1B3A57] group-hover:text-white transition-all duration-300">
                        Leer Comunicado <ArrowRight size={16} />
                        </button>
                    </Link>
                    </div>
                </article>
                ))}
            </div>
            ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No se encontraron noticias con los criterios de búsqueda.</p>
            </div>
            )
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsListPage;