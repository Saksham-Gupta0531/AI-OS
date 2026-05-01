import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import CursorEffect from './Cursor/CursorEffect'
import PackagesPage from './Packages/PackagesPage';
import LoginPage from './Auth/LoginPage.jsx'
import Admin from './Admin/Admin.jsx';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <CursorEffect />
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/authentication" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App