import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  CreditCard,
  Bell,
  Download,
  ChevronRight,
  Loader2,
  File
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config";

const AdmissionsPage = () => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArchivos();
  }, []);

  const fetchArchivos = async () => {
try {
      // Apuntar al endpoint correcto
      const endpoint = `${API_URL}/api/archivos/`;
      console.log("Intentando cargar archivos desde:", endpoint);

      const response = await fetch(endpoint);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Datos recibidos:", data); // Para depurar
        setArchivos(data);
      } else {
        console.error("Error en la respuesta del servidor:", response.status);
      }
    } catch (error) {
      console.error("Error cargando archivos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para arreglar la URL del PDF si viene relativa
  const getFileUrl = (url) => {
    if (!url) return "#";
    // Si la URL ya empieza con http (es absoluta), se queda igual
    if (url.startsWith("http")) return url;
    // Si es relativa (ej: /media/...), le pone el dominio del backend
    return `${API_URL}${url}`;
  };

  // Filtrar archivos por categoría
  const planillasNuevoIngreso = archivos.filter(a => a.categoria === "Planilla nuevo ingreso");
  const planillasRegulares = archivos.filter(a => a.categoria === "Planilla reingreso");

  const logoUrl = "https://i.imgur.com/1tbjjyM.png";
  const headerBg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600";

  const theme = {
    primary: "bg-[#1B3A57]",
    primaryText: "text-[#1B3A57]",
    accent: "bg-[#C62828]",
    accentHover: "hover:bg-[#B71C1C]",
    accentText: "text-[#C62828]",
    lightBg: "bg-[#FDFBF7]",
  };

  return (
    <div className={`min-h-screen ${theme.lightBg} font-sans text-gray-800`}>
      <Navbar />

      {/* HEADER (Igual que antes) */}
      <header className="relative h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={headerBg} alt="Oficina" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1B3A57]/90"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-wide">
            Gestión de Trámites e Inscripción
          </h1>
          <p className="text-gray-300 font-serif text-lg md:text-xl max-w-2xl mx-auto">
            Guía paso a paso para formar parte de nuestra comunidad educativa
          </p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Introducción (Igual que antes) */}
        <section className="mb-16 text-center">
          <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-3xl mx-auto">
            Estamos encantados de recibir a nuestros estudiantes nuevos y regulares...
          </p>
        </section>

        {/* Pasos (Igual que antes - Resumido aquí para brevedad) */}
        <div className="relative border-l-4 border-gray-200 ml-4 md:ml-8 space-y-12">
            {/* ... (Paso 1, 2, 3, 4 idénticos a tu código original) ... */}
            
            {/* PASO 1 */}
          <div className="relative pl-8 md:pl-12 group">
            <div className={`absolute -left-[22px] md:-left-[24px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.primary} flex items-center justify-center text-white shadow-lg border-4 border-[#FDFBF7]`}>
              <Download size={20} />
            </div>
            <div>
              <h3 className={`text-2xl font-serif font-bold ${theme.primaryText} mb-3 flex items-center gap-2`}>
                Paso 1: Descargue la Planilla
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <p className="text-gray-600 leading-relaxed mb-4">
                  El primer paso es descargar la planilla de inscripción desde
                  nuestro sitio web oficial. Una vez descargada, imprímala para
                  llenar una copia. Asegúrese de completar todos los campos de
                  manera precisa y legible. Una vez llena, debe entregar la copia a
                  nuestra Oficina de Dirección.
                </p>
              </div>
            </div>
          </div>

          {/* PASO 2 */}
          <div className="relative pl-8 md:pl-12 group">
             <div className={`absolute -left-[22px] md:-left-[24px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.primary} flex items-center justify-center text-white shadow-lg border-4 border-[#FDFBF7]`}>
              <FileText size={20} />
            </div>
            <div>
              <h3 className={`text-2xl font-serif font-bold ${theme.primaryText} mb-3`}>
                Paso 2: Revisión y Entrega de Documentos
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Diríjase a la coordinación correspondiente al nivel de estudios.
                  Nuestro equipo le ayudará a revisar sus documentos y garantizar
                  que estén en orden. Asegúrese de llevar todos los recaudos.
                </p>
                
                {/* Enlace a documentación */}
                <Link 
                  to="requisitos" 
                  className="inline-flex items-center gap-2 text-red-700 font-bold hover:underline transition-all"
                >
                  <ChevronRight size={18} />
                  Ver Documentación necesaria para la Inscripción
                </Link>
              </div>
            </div>
          </div>

           {/* PASO 3 */}
           <div className="relative pl-8 md:pl-12 group">
             <div className={`absolute -left-[22px] md:-left-[24px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.primary} flex items-center justify-center text-white shadow-lg border-4 border-[#FDFBF7]`}>
              <CreditCard size={20} />
            </div>
            <div>
              <h3 className={`text-2xl font-serif font-bold ${theme.primaryText} mb-3`}>
                Paso 3: Formalización de la Inscripción
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <p className="text-gray-600 leading-relaxed">
                  Una vez aprobados los documentos, proceda a llenar la planilla de inscripción respectiva según su caso.
                </p>
              </div>
            </div>
          </div>

           {/* PASO 4 */}
           <div className="relative pl-8 md:pl-12 group">
            <div className={`absolute -left-[22px] md:-left-[24px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.accent} flex items-center justify-center text-white shadow-lg border-4 border-[#FDFBF7]`}>
              <CheckCircle size={20} />
            </div>
            <div>
              <h3 className={`text-2xl font-serif font-bold ${theme.accentText} mb-3`}>
                Paso 4: Firma del Acta de Compromiso
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <p className="text-gray-600 leading-relaxed">
                  Finalmente, tanto el representante como el estudiante deben firmar el Acta de Compromiso y Normas de Convivencia. 
                  Este paso es esencial para sellar el proceso, confirmando que aceptan los reglamentos internos 
                  y finalizando así la matriculación en el sistema.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de Cierre */}
        <div className="mt-16 bg-[#1B3A57] text-white p-8 rounded-lg text-center shadow-lg">
          <Bell className="mx-auto mb-4 text-yellow-400" size={32} />
          <p className="font-serif text-lg mb-4">
            Si tiene alguna pregunta, no dude en comunicarse con nuestro equipo.
          </p>
        </div>

        {/* --- ZONA DE DESCARGAS DINÁMICA --- */}
        <section className="mt-20 border-t border-gray-200 pt-16" id="descargas">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#1B3A57] mb-4">
              Zona de Descargas
            </h2>
            <p className="text-gray-600">
              Documentos oficiales disponibles en formato PDF.
            </p>
          </div>

          {loading ? (
             <div className="text-center py-10">
                <Loader2 className="animate-spin mx-auto text-[#1B3A57] mb-2" size={32}/>
                <p>Cargando documentos...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                {/* COLUMNA 1: NUEVO INGRESO */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 border-b pb-4">
                        <div className="bg-blue-100 p-3 rounded-full text-[#1B3A57]">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#1B3A57] font-serif">Nuevo Ingreso</h3>
                    </div>

                    {planillasNuevoIngreso.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">No hay planillas disponibles.</p>
                    ) : (
                        <ul className="space-y-3">
                            {planillasNuevoIngreso.map(file => (
                                <li key={file.id}>
                                    <a 
                                        href={file.archivo_pdf} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#1B3A57] hover:bg-blue-50 transition group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <File size={16} className="text-gray-400 group-hover:text-[#1B3A57]"/>
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-[#1B3A57]">{file.titulo}</span>
                                        </div>
                                        <Download size={16} className="text-gray-300 group-hover:text-[#1B3A57]"/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* COLUMNA 2: REGULARES */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
                    {/* Decoración roja superior */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#C62828]"></div>

                    <div className="flex items-center gap-3 mb-6 border-b pb-4">
                        <div className="bg-red-50 p-3 rounded-full text-[#C62828]">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#C62828] font-serif">Estudiantes Regulares</h3>
                    </div>

                    {planillasRegulares.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">No hay planillas disponibles.</p>
                    ) : (
                        <ul className="space-y-3">
                            {planillasRegulares.map(file => (
                                <li key={file.id}>
                                    <a 
                                        href={file.archivo_pdf} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#C62828] hover:bg-red-50 transition group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <File size={16} className="text-gray-400 group-hover:text-[#C62828]"/>
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-[#C62828]">{file.titulo}</span>
                                        </div>
                                        <Download size={16} className="text-gray-300 group-hover:text-[#C62828]"/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Si quieres mostrar los "Otros" archivos, puedes añadir una tercera sección abajo */}
                {archivos.filter(a => a.categoria === "Otro").length > 0 && (
                    <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Otros Documentos de Interés</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {archivos.filter(a => a.categoria === "Otro").map(file => (
                                <a 
                                    key={file.id}
                                    href={file.archivo_pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-[#1B3A57] hover:underline"
                                >
                                    <FileText size={14}/> {file.titulo}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AdmissionsPage;