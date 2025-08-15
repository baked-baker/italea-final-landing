"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Menu, X, Home, BookOpen, Mail } from "lucide-react"

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/blog", icon: BookOpen, label: "Stories" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ]

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2 group">
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                <Leaf className="w-8 h-8 text-amber-600" />
              </motion.div>
              <motion.span
                className="text-2xl font-serif text-stone-800"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                italea
              </motion.span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={item.href} className="text-stone-600 hover:text-amber-600 transition-colors relative group">
                    {item.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden p-2" onClick={handleToggle} whileTap={{ scale: 0.95 }}>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-stone-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-stone-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={handleClose} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
            >
              <div className="p-6 pt-20">
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center space-x-3 text-stone-800 hover:text-amber-600 transition-colors group"
                        onClick={handleClose}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.2 }}>
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                        <span className="text-lg font-medium">{item.label}</span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Category Menu */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          className="w-14 h-14 bg-amber-600 text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const menuElement = document.getElementById("menu")
            if (menuElement) {
              menuElement.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </>
  )
}
