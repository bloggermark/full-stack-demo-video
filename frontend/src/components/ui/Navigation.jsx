import { NavLink } from "react-router-dom"

function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            DevJournal
          </NavLink>
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
