import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import CursorEffect from './Cursor/CursorEffect'
import PackagesPage from './Packages/PackagesPage';
import Contact from './Contact/Contact';
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/Dashboard';
import AgentsForm from './Admin/AgentsForm';

function App() {
  return (
    <Router>
      <CursorEffect />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="agents" element={<AgentsForm />} />
          <Route path="logs" element={<div className="p-8 text-white text-2xl font-bold">Logs (Coming Soon)</div>} />
          <Route path="security" element={<div className="p-8 text-white text-2xl font-bold">Security (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App