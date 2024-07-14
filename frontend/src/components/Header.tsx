import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface NavItem {
  name: string
  path: string
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = window.innerWidth < 1024 && !menuOpen

  return (
    <header className="absolute w-full z-50 py-6">
      <nav className="container mx-auto px-6 flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2"
        >
          <span className="font-bold text-2xl text-white">
            {!isMobile && (
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                christophel.io
              </motion.span>
            )}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex space-x-8 items-center"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white hover:text-blue-300 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
        <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden flex flex-col items-end bg-[#444159] my-2 border-b-blue-950"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white px-6 hover:bg-[#4e4b65] transition-colors duration-300 w-full py-4"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  )
}
