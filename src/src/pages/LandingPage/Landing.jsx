import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  ArrowRight,
  Clock // Añadí este icono para variar
} from "lucide-react";
import Footer from "../../components/Footer";
import NavbarScroll from "../../components/NavbarScroll";
import { API_URL } from "../../config";

const SchoolHomePage = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch(`${API_URL}/api/noticias/`);
        if (response.ok) {
            const data = await response.json();
            // Tomamos las 3 más recientes
            setNoticias(data.slice(0, 3)); 
        }
      } catch (error) {
        console.error("Error conectando con el backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const crearResumen = (htmlContent, maxLength = 110) => {
    if (!htmlContent) return "";
    
    // Crear un elemento temporal para extraer solo el texto
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formatFecha = (fechaString) => {
    if (!fechaString) return "";
    const date = new Date(fechaString);
    return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Tema y Recursos
  const heroImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvWQvxPU954VDKsmiMJhyphenhyphenYzYsgn-TS9vnijsNtzl2aKbl5vXBvwX1gYk7cZM5Ep-Whiqm6UB20VeDDnG7zr3Jv5XK8ZTwOppb90EQvmMS2HeL-FZFHxP5ifebeadLULhY90Qka9GH7h-ou/s1600/IMG00200.jpg";
  const theme = {
    primary: "bg-[#1B3A57]",
    primaryText: "text-[#1B3A57]",
    accent: "bg-[#C62828]",
    accentHover: "hover:bg-[#B71C1C]",
    accentText: "text-[#C62828]",
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-800">
      <NavbarScroll />

      {/* HERO SECTION */}
      <header className="relative h-[600px] flex items-center justify-center overflow-hidden" id="top">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Fachada del colegio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <GraduationCap size={48} className="text-white opacity-90" />
          </div>
          <p className="text-sm md:text-base tracking-widest mb-4 font-serif text-gray-200 uppercase opacity-90">
            Desde 1967, educando para la vida
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-10 tracking-wide drop-shadow-lg">
            U.E.N José Ángel Álamo
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tramites">
              <button className={`${theme.accent} ${theme.accentHover} text-white font-bold py-3 px-8 rounded transition duration-300 text-sm uppercase tracking-wider shadow-lg transform hover:-translate-y-1`}>
                Gestión de Trámites
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* QUIENES SOMOS */}
      <section id="nosotros" className="py-20 px-6 md:px-20 max-w-6xl mx-auto text-center relative">
         <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 ${theme.accent}`}></div>
         <h2 className={`text-4xl md:text-5xl font-serif ${theme.primaryText} mb-8 relative inline-block`}>¿Quienes Somos?</h2>
         <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-serif max-w-4xl mx-auto">
                    La Unidad Educativa Nacional José Ángel Álamo es una institución
          baluarte de la educación pública en Manduca a Ferrenquín, en la
          parroquia La Candelaria, antigua sede del liceo "Rafael Urdaneta".
          Desde nuestra fundación en 1967, hemos asumido ininterrumpidamente el
          compromiso de formar a los jóvenes del futuro bajo los principios de
          excelencia, ética y responsabilidad social. Más que un centro de
          estudios, somos un espacio de encuentro donde se fomenta el
          pensamiento crítico, la disciplina y el amor por el conocimiento,
          preparando a nuestros bachilleres no solo para la universidad, sino
          para los desafíos de la vida.
         </p>
      </section>

      {/* VALORES */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard title="Trayectoria Histórica" content="Con más de cinco décadas de servicio ininterrumpido a la comunidad de La Candelaria." theme={theme} />
          <FeatureCard title="Formación Integral" content="Nuestro modelo educativo trasciende las aulas, fomentando valores, deporte y cultura." theme={theme} />
          <FeatureCard title="Calidad Docente" content="Contamos con un cuerpo de profesores altamente calificados y comprometidos." theme={theme} />
          <FeatureCard title="Identidad Nacional" content="Promovemos el sentido de pertenencia y el amor por nuestra historia y tradiciones." theme={theme} />
        </div>
      </section>

      {/* --- CARTELERA DIGITAL (BLOGS) --- */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Cabecera de la sección */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h4 className="text-red-700 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-red-700 inline-block"></span> Cartelera Digital
              </h4>
              <h2 className={`text-3xl md:text-4xl font-serif ${theme.primaryText}`}>
                Noticias & Anuncios
              </h2>
            </div>
            {/* Botón ver todas */}
            <Link to="/blogs" className="hidden md:flex items-center gap-2 text-[#1B3A57] font-semibold hover:text-red-700 transition group">
              Ver histórico completo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid de Noticias */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* ESTADO: CARGANDO */}
            {loading && (
               <div className="col-span-3 py-12 text-center text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B3A57] mx-auto mb-2"></div>
                  <p>Cargando cartelera...</p>
               </div>
            )}

            {/* ESTADO: VACÍO */}
            {!loading && noticias.length === 0 && (
               <div className="col-span-3 py-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">No hay avisos recientes publicados.</p>
               </div>
            )}

            {/* ESTADO: CON DATOS */}
            {!loading && noticias.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group h-full"
                >
                  {/* Imagen de la noticia */}
                  <div className="h-48 overflow-hidden relative bg-gray-200">
                    <div className={`absolute top-4 left-4 ${theme.accent} text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wide shadow-md`}>
                      {post.categoria_nombre || "Información"}
                    </div>
                    
                    {post.imagen ? (
                       <img
                         src={post.imagen} 
                         alt={post.titulo}
                         className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                       />
                    ) : (
                       // Placeholder si no hay imagen
                       <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                         <GraduationCap size={32} className="opacity-20 mb-2"/>
                         <span className="text-xs font-bold uppercase opacity-50">Comunicado Oficial</span>
                       </div>
                    )}
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
                      <Calendar size={14} className="text-red-500" />
                      {formatFecha(post.fecha_publicacion)}
                    </div>
                    
                    <h3 className="text-lg font-serif font-bold text-gray-800 mb-3 group-hover:text-[#C62828] transition-colors leading-snug">
                      {post.titulo}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {/* Usamos función para limpiar HTML */}
                      {crearResumen(post.contenido)}
                    </p>
                    
                    <div className="mt-auto border-t border-gray-100 pt-4">
                        <Link
                          to={`/blogs/${post.id}`} // Enlace a la página de detalle (que haremos luego)
                          className="flex items-center gap-2 text-[#1B3A57] font-bold text-xs uppercase tracking-wider hover:text-[#C62828] transition-colors"
                        >
                          Leer Comunicado <ArrowRight size={14} />
                        </Link>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          
          {/* Botón móvil */}
          <div className="md:hidden mt-8 text-center">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-[#1B3A57] font-semibold">
                Ver todas las noticias <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </section>

      {/* UBICACIÓN Y FOOTER */}
      <section id="contacto" className="py-0 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px]">
             <div className={`${theme.primary} text-white p-12 flex flex-col justify-center`}>
                <h2 className="text-3xl font-serif mb-8 border-l-4 border-red-500 pl-4">Ubicación & Contacto</h2>
                <div className="space-y-6 text-lg font-light">
                   <div className="flex items-start gap-4">
                     <MapPin className="text-red-400 mt-1 flex-shrink-0" /><p>G34R+3W7, Avenida Oeste,<br />La Candelaria, Caracas 1011</p>
                   </div>
                   <div className="flex items-center gap-4"><Phone className="text-red-400 flex-shrink-0" /><p>(212) 561-96-10</p></div>
                   <div className="flex items-center gap-4"><Mail className="text-red-400 flex-shrink-0" /><p>gradoeduca@gmail.com</p></div>
                </div>
             </div>
             <div className="w-full h-96 lg:h-full bg-gray-200">
               <iframe src="https://maps.google.com/maps?q=G34R%2B3W7%2C%20Avenida%20Oeste%2C%20Caracas%201011&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Mapa"></iframe>
             </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

/* COMPONENTES AUXILIARES */
const FeatureCard = ({ title, content, theme }) => (
  <div className={`group bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-red-300 transition-all duration-300`}>
    <h3 className={`text-2xl font-serif font-bold text-gray-800 mb-3 group-hover:${theme.accentText} transition-colors`}>{title}</h3>
    <p className="text-gray-600 font-serif leading-relaxed text-sm">{content}</p>
  </div>
);

export default SchoolHomePage;