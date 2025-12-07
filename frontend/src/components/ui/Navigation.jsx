import { NavLink } from "react-router-dom"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react"

function Navigation() {
  return (
    <>
      <header className="flex gap-3 p-4">
        <SignedOut>
          <div className="flex gap-3 items-center">
            <SignInButton className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium" />
            <SignUpButton className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium" />
            <p className="text-gray-600">Welcome, please sign in or sign up!</p>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-between items-center w-full">
            <UserButton />
          </div>
        </SignedIn>
      </header>
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
              <NavLink
                to="/newsletter"
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                Newsletter
              </NavLink>
              <NavLink
                to="/journal"
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                Journal
              </NavLink>
              <SignedIn>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  Profile
                </NavLink>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
