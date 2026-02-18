import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Facebook,
  FileCheck,
  ArrowLeft,
  Check,
  AlertCircle,
  BookOpen,
  GraduationCap
} from "lucide-react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RequirementsPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll al inicio al cargar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
6
  const logoUrl = "https://i.imgur.com/1tbjjyM.png";
  const headerBg = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1600"; // Imagen de biblioteca/documentos

  const theme = {
    primary: "bg-[#1B3A57]",
    primaryText: "text-[#1B3A57]",
    accent: "bg-[#C62828]",
    lightBg: "bg-[#FDFBF7]",
  };

  // Datos de los requisitos
  const requirementsPrimaria = [
    "Partida de nacimiento del estudiante (fotocopia y original). (En caso de nuevo ingreso o no consignado anteriormente).",
    "Fotocopia nítida de la Cédula de identidad (niños mayores de 10 años).",
    "Fotocopia nítida de la Cédula de Identidad del representante.",
    "Certificado de Aprendizaje (solo para estudiantes nuevo ingreso).",
    "Descripción de Avances Pedagógicos del III momento.",
    "Tres (03) fotos tipo carnet del estudiante y dos (02) del representante legal.",
    "Copia del Certificado de vacunación (para niños y niñas del 1er grado).",
    "De no ser el padre o la madre: Autorización Notariada como representante (copia con vista al original).",
    "Constancia de Retiro del Sistema de Gestión Escolar (SIGE), expedida por el Plantel de Procedencia (si es nuevo ingreso).",
    "Informe médico o de especialista (para estudiantes con casos especiales de salud)."
  ];

  const requirementsMedia = [
    "Certificado de aprobación de 6to Grado (solo para nuevo ingreso al 1er Año).",
    "Notas Certificadas expedidas por el plantel de procedencia (para nuevo ingreso de 2do a 5to Año).",
    "Original y copia nítida de la Partida de Nacimiento (En caso de nuevo ingreso o no consignado anteriormente).",
    "Dos (02) fotocopias nítidas y ampliadas de la Cédula de Identidad del estudiante.",
    "Dos (02) fotocopias nítidas y ampliadas de la Cédula de Identidad del representante.",
    "CASO 5TO AÑO: Cuatro (04) fotocopias nítidas y ampliadas de la Cédula de Identidad del estudiante.",
    "Dos (02) fotos recientes, tipo carnet, del estudiante y dos (02) del representante legal.",
    "Original y copia del Boletín de Calificaciones del año anterior.",
    "Constancia de Retiro del Sistema de Gestión Escolar (SIGE), expedida por el Plantel de Procedencia (si es nuevo ingreso).",
    "De no ser el padre o la madre: Autorización Notariada como representante (copia con vista al original).",
    "Informe médico o de especialista (para estudiantes con casos especiales de salud)."
  ];

  return (
    <div className={`min-h-screen ${theme.lightBg} font-sans text-gray-800`}>
      {/* NAVBAR*/}
<Navbar/>

      {/* HEADER */}
      <header className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={headerBg} alt="Documentación" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1B3A57]/90"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 mt-16">
          <div className="flex justify-center mb-4">
            <FileCheck size={48} className="text-white opacity-90" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide">
            Requisitos y Documentación
          </h1>
          <p className="text-gray-300 font-serif text-lg mt-2">
            Prepare sus recaudos para una inscripción exitosa
          </p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Aviso Importante */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-12 rounded-r shadow-sm flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-yellow-800">Nota Importante</h3>
            <p className="text-sm text-yellow-700">
              Asegúrese de presentar todos los documentos en una carpeta manila debidamente identificada. Los documentos originales solo se solicitan para verificación (vista al original) a menos que se indique lo contrario.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* COLUMNA 1 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="bg-[#4a90e2] p-6 text-white text-center">
              <BookOpen className="mx-auto mb-2" size={32} />
              <h2 className="text-2xl font-serif font-bold">Educación Primaria</h2>
              <p className="opacity-90 text-sm tracking-widest uppercase">1ero a 6to Grado</p>
            </div>
            <div className="p-8 flex-1">
              <ul className="space-y-4">
                {requirementsPrimaria.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <div className="min-w-[20px] pt-1">
                      <Check size={18} className="text-[#4a90e2] font-bold" />
                    </div>
                    <span className="text-sm md:text-base leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMNA 2 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="bg-[#C62828] p-6 text-white text-center">
              <GraduationCap className="mx-auto mb-2" size={32} />
              <h2 className="text-2xl font-serif font-bold">Educación Media</h2>
              <p className="opacity-90 text-sm tracking-widest uppercase">1ero a 5to Año</p>
            </div>
            <div className="p-8 flex-1">
              <ul className="space-y-4">
                {requirementsMedia.map((req, index) => {
                  // Resaltar 5to año
                  const isSpecial = req.includes("CASO 5TO AÑO");
                  return (
                    <li key={index} className={`flex items-start gap-3 ${isSpecial ? "bg-red-50 p-2 rounded border border-red-100" : "text-gray-700"}`}>
                      <div className="min-w-[20px] pt-1">
                        <Check size={18} className="text-[#C62828] font-bold" />
                      </div>
                      <span className={`text-sm md:text-base leading-relaxed ${isSpecial ? "font-bold text-red-800" : ""}`}>
                        {req}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>

        {/* BOTÓN DE REGRESO */}
        <div className="mt-16 text-center">
          <Link to="/tramites">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#1B3A57] font-serif rounded-full hover:bg-[#152C42] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
              Regresar para conocer el proceso para la Inscripción
            </button>
          </Link>
        </div>

      </main>

      {/* FOOTER */}
 <Footer/>
    </div>
  );
};

export default RequirementsPage;