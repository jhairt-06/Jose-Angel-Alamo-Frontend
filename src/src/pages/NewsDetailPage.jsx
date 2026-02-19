import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Calendar, User, ArrowLeft, Share2, Printer, GraduationCap, ArrowRight
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config";

const NewsDetailPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Estados existentes
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // --- NUEVO ESTADO: Para las noticias relacionadas ---
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Función auxiliar para limpiar HTML y obtener un extracto
  const getExcerpt = (htmlContent, maxLength = 100) => {
    if (!htmlContent) return "";
    // Elimina etiquetas HTML usando una expresión regular simple
    const textOnly = htmlContent.replace(/<[^>]+>/g, ' ');
    if (textOnly.length <= maxLength) return textOnly;
    return textOnly.substr(0, maxLength) + "...";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true); // Reiniciamos loading al cambiar de ID

    const fetchData = async () => {
      try {
        // 1. Fetch de la noticia actual
        const postResponse = await fetch(`${API_URL}/api/noticias/${id}/`);
        
        if (postResponse.ok) {
          const postData = await postResponse.json();
          setPost(postData);

          // 2. Fetch de todas las noticias para sacar las relacionadas

          const allResponse = await fetch(`${API_URL}/api/noticias/`);
          if (allResponse.ok) {
            const allData = await allResponse.json();
        
            const otherPosts = allData
                .filter(p => p.id !== parseInt(id)) 
                .slice(0, 3); 
            
            setRelatedPosts(otherPosts);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatFecha = (fechaString) => {
    if (!fechaString) return "";
    const date = new Date(fechaString);
    return date.toLocaleDateString('es-VE', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const pageBackground = {
    backgroundColor: "#eef2f6",
    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
    backgroundSize: "30px 30px"
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={pageBackground}>
         <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1B3A57] mx-auto mb-4"></div>
            <p className="text-gray-500 font-serif">Cargando noticia...</p>
         </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={pageBackground}>
         <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md text-center">
             <h2 className="text-2xl font-serif font-bold text-[#1B3A57] mb-4">Contenido no encontrado</h2>
             <Link to="/blogs" className="inline-flex items-center gap-2 bg-[#1B3A57] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-900 transition">
                <ArrowLeft size={16} /> Volver
             </Link>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col" style={pageBackground}>
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1B3A57] transition font-bold text-sm group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Volver a la cartelera</span>
            </Link>
            
            <div className="flex gap-2">
                <button onClick={() => window.print()} className="p-2 bg-white/80 hover:bg-white text-slate-500 rounded-full shadow-sm transition">
                    <Printer size={18}/>
                </button>
                <button 
                    onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Enlace copiado"); }}
                    className="p-2 bg-white/80 hover:bg-white text-slate-500 rounded-full shadow-sm transition"
                >
                    <Share2 size={18}/>
                </button>
            </div>
        </div>

        {/* --- CARTA DE LA PUBLICACIÓN PRINCIPAL --- */}
        <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-white mb-16">
          
          <div className="relative w-full aspect-video md:aspect-[21/9] bg-slate-200">
            {post.imagen ? (
                <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <GraduationCap size={48} className="text-slate-300"/>
                </div>
            )}
            <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-[#C62828] text-white shadow-lg">
                    {post.categoria_nombre || "Comunicado"}
                 </span>
            </div>
          </div>

          <div className="px-8 md:px-16 pt-12 pb-16">
              <header className="mb-10 text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                    {post.titulo}
                  </h1>
                  
                  <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5"><Calendar size={16} className="text-[#C62828]"/> {formatFecha(post.fecha_publicacion)}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                      <span className="flex items-center gap-1.5"><User size={16} className="text-[#1B3A57]"/> Administración</span>
                  </div>
              </header>

              <div className="blog-content prose prose-slate max-w-none">
                  {/* Usamos una expresión regular (/\n/g) para buscar todos los saltos de línea y reemplazarlos por <br /> */}
                  <div dangerouslySetInnerHTML={{ __html: post.contenido.replace(/\n/g, '<br />') }} />
              </div>
              
              <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center text-center">
                  <div className="w-12 h-1 bg-[#C62828] mb-6 rounded-full"></div>
                  <p className="font-serif italic text-slate-400">
                      Unidad Educativa Nacional<br/>
                      <span className="text-slate-800 font-bold not-italic">José Ángel Álamo</span>
                  </p>
              </footer>
          </div>
        </article>

        {/* TAMBIÉN TE PODRÍA INTERESAR --- */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto mt-12 mb-8">
            <h3 className="text-2xl font-serif font-bold text-[#1B3A57] mb-6 flex items-center gap-2">
              También te podría interesar
              <span className="h-px flex-grow bg-slate-300 ml-4 opacity-50"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link 
                  to={`/blogs/${related.id}`} 
                  key={related.id} 
                  className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-200 flex flex-col"
                >
                   {/* Header pequeña de la tarjeta */}
                   <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-[#C62828] uppercase tracking-wider bg-red-50 px-2 py-1 rounded">
                        {related.categoria_nombre || "Noticia"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(related.fecha_publicacion).toLocaleDateString()}
                      </span>
                   </div>

                   {/* Título */}
                   <h4 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-[#1B3A57] transition-colors">
                     {related.titulo}
                   </h4>

                   {/* Extracto del cuerpo (sin HTML) */}
                   <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
                     {getExcerpt(related.contenido)}
                   </p>

                   {/* Botón Leer más */}
                   <div className="flex items-center text-sm font-bold text-[#1B3A57] mt-auto group-hover:underline">
                      Leer publicación <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform"/>
                   </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
      
      {/* Estilos existentes */}
      <style>{`
        .blog-content {
          font-family: 'Georgia', serif;
          font-size: 1.15rem;
          line-height: 1.85;
          color: #334155;
        }
        .blog-content p { margin-bottom: 1.8rem; }
        .blog-content strong { color: #1e293b; font-weight: 700; }
        .blog-content h2, .blog-content h3 { 
            color: #1B3A57; 
            margin-top: 2.5rem; 
            margin-bottom: 1rem; 
            font-family: ui-sans-serif, system-ui; 
            font-weight: 800;
        }
        .blog-content h2 { font-size: 1.8rem; letter-spacing: -0.02em; }
        .blog-content ul { list-style: none; padding-left: 0.5rem; margin-bottom: 2rem; }
        .blog-content li { 
            padding-left: 1.5rem; 
            position: relative; 
            margin-bottom: 0.8rem;
        }
        .blog-content li::before {
            content: "→";
            position: absolute;
            left: 0;
            color: #C62828;
            font-weight: bold;
        }
        .blog-content blockquote {
            border-left: 4px solid #1B3A57;
            padding: 1.5rem 2rem;
            background: #f8fafc;
            margin: 2.5rem 0;
            border-radius: 0 1rem 1rem 0;
            font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default NewsDetailPage;