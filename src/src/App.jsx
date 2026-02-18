import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

import AdmissionsPage from './pages/AdmissionsPage';
import LandingPage from './pages/LandingPage/Landing'; 
import ContactPage from './pages/ContactPage';
import RequirementsPage from './pages/RequirementsPage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from "./pages/NewsDetailPage";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <><div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tramites" element={<AdmissionsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/tramites/requisitos" element={<RequirementsPage />} />
          <Route path="/blogs" element={<NewsListPage />} />
          <Route path="/blogs/:id" element={<NewsDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div><div>
        <Toaster position="top-center" />
      </div></>
        
  );
}

export default App;
