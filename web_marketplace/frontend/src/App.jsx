import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import CursorEffect from './Cursor/CursorEffect'

function App() {
  return (
    <Router>
      <CursorEffect />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App