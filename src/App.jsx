import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Waitlist from './pages/Waitlist'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/join" element={<Waitlist />} />
    </Routes>
  )
}

export default App
