import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import PackagesPage from './Packages/PackagesPage';
import LoginPage from './Auth/LoginPage';

// New Docs Imports
import DocsLanding from './Docs/DocsLanding';
import DocsLayout from './Docs/DocsLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Docs Routing */}
        <Route path="/docs" element={<DocsLanding />} />
        <Route path="/docs/:categoryId" element={<DocsLayout />} />
        <Route path="/docs/:categoryId/:articleId" element={<DocsLayout />} />
      </Routes>
    </BrowserRouter>
  );
}