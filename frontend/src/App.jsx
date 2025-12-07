import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/ui/Navigation"
import Home from "./components/Home"
import About from "./components/About"
import Profile from "./components/Profile"
import Newsletter from "./components/Newsletter"
import Journal from "./components/Journal"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
