import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Upload,
  X,
  Bold,
  Italic,
  List,
  Type,
  Edit, 
} from "lucide-react";

import toast from 'react-hot-toast';
import { API_URL } from "../config";

const theme = {
  primary: "bg-[#1B3A57]",
  primaryText: "text-[#1B3A57]",
  accent: "bg-[#C62828]",
};

const NewsManager = ({ token }) => {
  // --- ESTADOS ---
  const [categorias, setCategorias] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // NUEVO ESTADO: Rastrea si estamos editando una noticia
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "", 
    contenido: "",
    imagen: null,
  });

  const textAreaRef = useRef(null);

  // --- CARGA INICIAL ---
  useEffect(() => {
    fetchCategorias();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/noticias/`)
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error cargando noticias:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categorias/`)
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
        if (data.length > 0 && !editingId) {
          setFormData((prev) => ({ ...prev, categoria: data[0].id }));
        }
      }
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  // --- MANEJADORES DE FORMULARIO ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- LIMPIAR FORMULARIO (CANCELAR) ---
  const handleCancel = () => {
    if ((formData.titulo || formData.contenido) && !window.confirm("¿Descartar los cambios actuales?")) {
        return;
    }

    setEditingId(null); 
    setFormData({
      titulo: "",
      categoria: categorias.length > 0 ? categorias[0].id : "",
      contenido: "",
      imagen: null,
    });
    setPreviewUrl(null);
  };

  // --- CARGAR DATOS PARA EDITAR ---
  const handleEditClick = (post) => {
    setEditingId(post.id);
    setFormData({
      titulo: post.titulo,
      categoria: post.categoria, 
      contenido: post.contenido,
      imagen: null, 
    });
    setPreviewUrl(post.imagen); 
    window.scrollTo({ top: 0, behavior: "smooth" }); // Subimos la pantalla al formulario
  };

  // --- EDITOR DE TEXTO ---
  const insertTag = (tagStart, tagEnd = "") => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.contenido;

    const newText =
      text.substring(0, start) +
      tagStart +
      text.substring(start, end) +
      tagEnd +
      text.substring(end);

    setFormData({ ...formData, contenido: newText });
    
    setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = end + tagStart.length + tagEnd.length;
    }, 0);
  };

  // --- CREAR O ACTUALIZAR NOTICIA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    dataToSend.append("titulo", formData.titulo);
    dataToSend.append("contenido", formData.contenido);
    dataToSend.append("categoria", formData.categoria);
    
    // Solo se envia la imagen si el usuario subió un archivo nuevo
    if (formData.imagen instanceof File) {
      dataToSend.append("imagen", formData.imagen);
    }

    // Se decide si se usa POST (crear) o PATCH (actualizar)
    const method = editingId ? "PATCH" : "POST";
    const url = editingId 
        ? `${API_URL}/api/noticias/${editingId}/` 
        : `${API_URL}/api/noticias/`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
            "Authorization": `Token ${token}`
        },
        body: dataToSend,
      });

      if (response.ok) {
        toast.success(editingId ? "Noticia actualizada con éxito" : "Noticia publicada con éxito");
        setEditingId(null);
        setFormData({
          titulo: "",
          categoria: categorias.length > 0 ? categorias[0].id : "",
          contenido: "",
          imagen: null,
        });
        setPreviewUrl(null);
        fetchPosts(); 
      } else {
        toast.error("Error al guardar. Verifique los campos o su sesión.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // --- API: BORRAR NOTICIA ---
  const handleDelete = async (id) => {
    if (!id) {
        toast.error("Error: No se pudo identificar la noticia a borrar.");
        return;
    }

    if (!window.confirm("¿Estás seguro de eliminar esta noticia permanentemente?")) return;

    try {
      const response = await fetch(`${API_URL}/api/noticias/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        },
      });
      
      if (response.ok) {
          fetchPosts();
          toast.success("Noticia eliminada");
          // Si estamos borrando la noticia que teníamos abierta para editar, limpiamos el formulario
          if (editingId === id) handleCancel();
      } else {
          toast.error("No se pudo eliminar la noticia. Verifique su sesión.");
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* --- FORMULARIO --- */}
      <div className="lg:col-span-2 space-y-6">
        <div className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${editingId ? 'border-yellow-500' : 'border-transparent'}`}>
          <h3 className="text-lg font-serif font-bold text-gray-800 mb-6 flex items-center gap-2">
            {editingId ? (
              <><Edit size={20} className="text-yellow-600" /> Editar Noticia</>
            ) : (
              <><Plus size={20} className="text-red-600" /> Redactar Nueva Noticia</>
            )}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded focus:ring-1 focus:ring-blue-900 outline-none"
                  placeholder="Ej: Inicio de Inscripciones"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-1 focus:ring-blue-900 outline-none"
                >
                  {categorias.length === 0 ? (
                    <option value="">Cargando...</option>
                  ) : (
                    categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Imagen de Portada</label>
              <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center bg-gray-50">
                {previewUrl ? (
                  <div className="relative w-full h-48 mb-2">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => { setFormData({ ...formData, imagen: null }); setPreviewUrl(null); }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded inline-block transition">
                      <span>{editingId ? "Cambiar Imagen" : "Seleccionar Imagen"}</span>
                      <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contenido (Editor)</label>
              <div className="flex gap-1 mb-2 border border-gray-300 rounded-t p-2 bg-gray-50">
                <button type="button" onClick={() => insertTag("<b>", "</b>")} className="p-1.5 hover:bg-gray-200 rounded" title="Negrita"><Bold size={16} /></button>
                <button type="button" onClick={() => insertTag("<i>", "</i>")} className="p-1.5 hover:bg-gray-200 rounded" title="Itálica"><Italic size={16} /></button>
                <button type="button" onClick={() => insertTag("<h3>", "</h3>")} className="p-1.5 hover:bg-gray-200 rounded" title="Título"><Type size={16} /></button>
                <button type="button" onClick={() => insertTag("<ul><li>", "</li></ul>")} className="p-1.5 hover:bg-gray-200 rounded" title="Lista"><List size={16} /></button>
              </div>
              <textarea
                ref={textAreaRef}
                name="contenido"
                value={formData.contenido}
                onChange={handleInputChange}
                rows="8"
                className="w-full p-3 border border-t-0 rounded-b focus:ring-1 focus:ring-blue-900 outline-none font-mono text-sm"
                placeholder="Escriba aquí..."
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`${editingId ? 'bg-yellow-600 hover:bg-yellow-700' : theme.primary} text-white px-6 py-2 rounded font-bold flex items-center gap-2 transition-colors`}
              >
                {loading ? "Guardando..." : (editingId ? "Actualizar Noticia" : "Publicar Noticia")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- LISTA LATERAL --- */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto max-h-[800px]">
          <h3 className="text-lg font-serif font-bold text-gray-800 mb-4">
            Publicaciones Recientes
          </h3>
          {posts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No hay noticias aún.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className={`p-4 border rounded-lg hover:shadow-md transition relative group ${editingId === post.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}
                >
                  <div className="flex justify-between items-start mb-1 pr-14">
                    <span className="text-xs font-bold text-red-600 uppercase">
                      {post.categoria_nombre || "General"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(post.fecha_publicacion).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#1B3A57] text-sm leading-tight mb-2">
                    {post.titulo}
                  </h4>
                  
                  {/* Botones de Acción (Editar y Eliminar) */}
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => handleEditClick(post)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-yellow-500 rounded transition-all duration-200 shadow-sm bg-white"
                      title="Editar publicación"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-red-600 rounded transition-all duration-200 shadow-sm bg-white"
                      title="Eliminar publicación"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsManager;