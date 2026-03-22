import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import CursorEffect from './Cursor/CursorEffect'
import PackagesPage from './Packages/PackagesPage';

function App() {
  return (
    <Router>
      <CursorEffect />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/packages" element={<PackagesPage />} />
      </Routes>
    </Router>
  )
}

export default App