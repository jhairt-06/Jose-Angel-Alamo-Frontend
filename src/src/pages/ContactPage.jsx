import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser"; // <--- 1. Importamos EmailJS
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Menu,
  X,
  Send,
  Loader2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    asunto: "",
    comentarios: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validación del formulario
  const validateForm = () => {
    let newErrors = {};
    if (!formData.nombres.trim())
      newErrors.nombres = "El nombre es obligatorio";
    if (!formData.apellidos.trim())
      newErrors.apellidos = "El apellido es obligatorio";
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.asunto.trim()) newErrors.asunto = "El asunto es obligatorio";
    if (!formData.comentarios.trim())
      newErrors.comentarios = "El comentario es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Lógica de Envío con EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Tokens de EmailJS
      const serviceID = "service_k59uv67";
      const templateID = "template_f2aql5z";
      const publicKey = "QPje-ID-oRpA9HE84";

      // Datos a enviar
      const templateParams = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        asunto: formData.asunto,
        comentarios: formData.comentarios,
      };

      emailjs
        .send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitting(false);
          setIsSuccess(true);

          // Limpiar formulario
          setFormData({
            nombres: "",
            apellidos: "",
            email: "",
            telefono: "",
            asunto: "",
            comentarios: "",
          });

          // Ocultar mensaje de éxito después de 5 segundos
          setTimeout(() => setIsSuccess(false), 5000);
        })
        .catch((err) => {
          console.error("FAILED...", err);
          setIsSubmitting(false);
          // Mostrar error
          alert(
            "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
          );
        });
    }
  };

  const logoUrl = "https://i.imgur.com/1tbjjyM.png";
  const headerBg =
    "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1600";

  const theme = {
    primary: "bg-[#1B3A57]",
    primaryText: "text-[#1B3A57]",
    accent: "bg-[#C62828]",
    lightBg: "bg-[#FDFBF7]",
  };

  return (
    <div className={`min-h-screen ${theme.lightBg} font-sans text-gray-800`}>
      {/* NAVBAR */}

      <Navbar />

      {/* HEADER */}
      <header className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={headerBg}
            alt="Contacto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1B3A57]/90"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 mt-16">
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide mb-2">
            Contáctenos
          </h1>
          <p className="text-gray-300 font-serif text-lg">
            Estamos aquí para atender sus dudas y requerimientos
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div>
            <div className="mb-8">
              <h2
                className={`text-3xl font-serif font-bold ${theme.primaryText} mb-4`}
              >
                Envíenos un mensaje
              </h2>
              <p className="text-gray-600">
                Complete el siguiente formulario y nuestro equipo administrativo
                le responderá a la brevedad posible al correo electrónico
                proporcionado.
              </p>
            </div>

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center animate-fade-in">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  ¡Mensaje Enviado!
                </h3>
                <p className="text-green-700">
                  Gracias por contactarnos. Hemos recibido su solicitud y le
                  responderemos pronto.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-green-700 font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombres */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Nombres <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition ${errors.nombres ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                      placeholder="Ej. Juan Andrés"
                    />
                    {errors.nombres && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.nombres}
                      </span>
                    )}
                  </div>

                  {/* Apellidos */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Apellidos <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition ${errors.apellidos ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                      placeholder="Ej. Pérez Silva"
                    />
                    {errors.apellidos && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.apellidos}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Teléfono{" "}
                      <span className="text-gray-400 font-normal">
                        (Opcional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition"
                      placeholder="(0412) 000-0000"
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Asunto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition ${errors.asunto ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    placeholder="Ej. Solicitud de cupo para 3er grado"
                  />
                  {errors.asunto && (
                    <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.asunto}
                    </span>
                  )}
                </div>

                {/* Comentarios */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Comentarios <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition resize-none ${errors.comentarios ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    placeholder="Escriba su mensaje aquí..."
                  ></textarea>
                  {errors.comentarios && (
                    <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.comentarios}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#C62828] hover:bg-[#B71C1C] hover:-translate-y-1"}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* INFORMACIÓN Y MAPA */}
          <div className="space-y-8">
            {/* Tarjeta */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#1B3A57]">
              <h3 className="text-2xl font-serif font-bold text-[#1B3A57] mb-6 border-b pb-4">
                Información de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[#1B3A57]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Dirección</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      G34R+3W7, Avenida Oeste,
                      <br />
                      La Candelaria, Caracas 1011,
                      <br />
                      Distrito Capital.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[#1B3A57]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Teléfonos</h4>
                    <p className="text-gray-600 text-sm">
                      (212) 561-96-10
                      <br />
                      (412) 555-3635
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[#1B3A57]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Correo Electrónico
                    </h4>
                    <p className="text-gray-600 text-sm">
                      gradoeduca@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[#1B3A57]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Horario de Atención
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lunes a Viernes
                      <br />
                      7:00 AM - 12:00 PM
                      <br />
                      1:00 PM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="h-80 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.942810049931!2d-66.90769399999999!3d10.5051708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a5ed24b90a799%3A0xeab7ed0c0f2fb882!2zTGljZW8gSm9zw6kgw4FuZ2VsIMOBbGFtbw!5e0!3m2!1ses-419!2sve!4v1768359475770!5m2!1ses-419!2sve"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Ubicación"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ContactPage;
