import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

import toast from 'react-hot-toast'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [localSearch, setLocalSearch] = useState("")
  
  const {
    user,
    setUser,
    setShowLogin,
    navigate,
    setSearch,
    search,
    getcount,
    axios
  } = useAppContext()

  useEffect(() => {
    console.log("Navbar - Current search state:", {
      type: typeof search,
      value: search,
      isString: typeof search === 'string',
      isObject: typeof search === 'object',
      isArray: Array.isArray(search)
    })
    
    if (search && typeof search !== 'string') {
      console.warn("Search is not a string, resetting to empty string")
      if (typeof setSearch === 'function') {
        setSearch("")
      }
    }
  }, [search, setSearch])

  useEffect(() => {
    if (typeof search === 'string') {
      setLocalSearch(search)
    } else {
      setLocalSearch("")
    }
  }, [search])

  useEffect(() => {
    if (localSearch && localSearch.trim().length > 0) {
      navigate("/products")
    }
  }, [localSearch, navigate])

  const handleLogout = async () => {
    setOpen(false)
    setLoggingOut(true)
    
    try {
      const { data } = await axios.post("/api/user/logout", {}, {
        withCredentials: true
      })
      
      if (data.success) {
        toast.success(data.message || "Logged out successfully")
        setUser(null)
        if (typeof setSearch === 'function') {
          setSearch("")
        }
        setLocalSearch("")
        navigate('/')
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        toast.error(data.message || "Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      
      if (error.response?.status === 401) {
        toast.error("Session already expired")
      } else {
        toast.error(error.response?.data?.message || error.message || "Network error")
      }
      
      setUser(null)
      if (typeof setSearch === 'function') {
        setSearch("")
      }
      setLocalSearch("")
      navigate('/')
    } finally {
      setLoggingOut(false)
    }
  }

  const handleOrdersClick = () => {
    setOpen(false)
    navigate('/myOrders')
  }

  const handleLoginClick = () => {
    setOpen(false)
    setShowLogin(true)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearch(value)
    if (typeof setSearch === 'function') {
      setSearch(value)
    }
  }

  const handleClearSearch = () => {
    setLocalSearch("")
    if (typeof setSearch === 'function') {
      setSearch("")
    }
  }

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 z-50 bg-transparent">
      {/* Logo */}
      <NavLink to='/' onClick={() => {
        setOpen(false)
        handleClearSearch()
      }}>
        <img src="/image.png" className='h-12 w-45 md:h-15 md:w-65' alt="Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-black">
        <NavLink 
          to="/" 
          className="hover:text-primary transition  font-medium"
          onClick={handleClearSearch}
        >
          Home
        </NavLink>
        <NavLink 
          to="/products" 
          className="hover:text-primary transition  font-medium"
          onClick={handleClearSearch}
        >
          All Products
        </NavLink>
        <NavLink 
          to="/contact" 
          className="hover:text-primary transition  font-medium"
          onClick={handleClearSearch}
        >
          Contact
        </NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2  backdrop-blur-sm border border-gray-300 px-3 rounded-full">
          <input 
            onChange={handleSearchChange}
            value={localSearch}
            className="py-1.5 w-full bg-transparent outline-none placeholder-white" 
            type="text" 
            placeholder="Search products" 
          />
          <img src={assets.search_icon} className='w-4 h-4' alt="Search" />
          {localSearch && (
            <button 
              onClick={handleClearSearch}
              className="text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        {/* Cart Icon */}
        <div 
          onClick={() => { 
            navigate("/cart"); 
            setOpen(false); 
            handleClearSearch();
          }} 
          className="relative cursor-pointer hover:opacity-80 transition"
        >
          <img src="/nav_cart_icon.png" className='w-6 ' alt="Cart" />
          {getcount() > 0 && (
            <span className="absolute -top-2 -right-3 text-xs text-black bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getcount()}
            </span>
          )}
        </div>

        {/* User Section */}
        {!user ? (
          <button 
            onClick={handleLoginClick}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className='relative group'>
            <img 
              src="/profile_icon.png"
              className='w-10 cursor-pointer ' 
              alt="Profile" 
            />
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow-lg border border-gray-200 py-2 w-40 rounded-md text-sm z-50'>
              <li 
                onClick={handleOrdersClick}
                className='px-4 py-2 hover:bg-primary/10 cursor-pointer transition'
              >
                My Orders
              </li>
              <li 
                onClick={handleLogout}
                disabled={loggingOut}
                className={`px-4 py-2 hover:bg-primary/10 cursor-pointer transition ${
                  loggingOut ? 'text-gray-400 cursor-not-allowed' : ''
                }`}
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Icons */}
      <div className='flex items-center gap-6 sm:hidden'>
        {/* Cart Icon (Mobile) */}
        <div 
          onClick={() => { 
            navigate("/cart"); 
            setOpen(false); 
            handleClearSearch();
          }} 
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className='w-6 filter brightness-0 invert' alt="Cart" />
          {getcount() > 0 && (
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getcount()}
            </span>
          )}
        </div>
        
        {/* Hamburger Menu */}
        <button 
          onClick={() => setOpen(!open)} 
          aria-label="Menu"
          className="p-2"
        >
          <img src={open ? assets.close_icon || assets.menu_icon : assets.menu_icon} className="filter brightness-0 invert" alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`
        ${open ? 'flex' : 'hidden'} 
        absolute top-[70px] left-0 w-full bg-white shadow-lg py-4 flex-col items-start gap-3 px-5 text-sm md:hidden
        border-t border-gray-200 z-50
      `}>
        <NavLink 
          to="/" 
          onClick={() => {
            setOpen(false)
            handleClearSearch()
          }}
          className="w-full py-2 hover:text-primary transition text-gray-800"
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/products" 
          onClick={() => {
            setOpen(false)
            handleClearSearch()
          }}
          className="w-full py-2 hover:text-primary transition text-gray-800"
        >
          All Products
        </NavLink>
        
        {user && (
          <NavLink 
            to="/myOrders" 
            onClick={() => {
              setOpen(false)
              handleClearSearch()
            }}
            className="w-full py-2 hover:text-primary transition text-gray-800"
          >
            My Orders
          </NavLink>
        )}
        
        <NavLink 
          to="/contact" 
          onClick={() => {
            setOpen(false)
            handleClearSearch()
          }}
          className="w-full py-2 hover:text-primary transition text-gray-800"
        >
          Contact
        </NavLink>

        {/* Mobile Search Bar */}
        <div className="w-full flex items-center gap-2 border border-gray-300 px-3 rounded-full mt-2 bg-gray-50">
          <input 
            onChange={handleSearchChange}
            value={localSearch}
            className="py-2 w-full bg-transparent outline-none placeholder-gray-500" 
            type="text" 
            placeholder="Search products" 
          />
          <img src={assets.search_icon} className='w-4 h-4' alt="Search" />
          {localSearch && (
            <button 
              onClick={handleClearSearch}
              className="text-gray-500 hover:text-gray-700"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile Auth Buttons */}
        <div className="w-full mt-3 space-y-2">
          {!user ? (
            <button 
              onClick={handleLoginClick}
              className="w-full cursor-pointer px-6 py-3 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <>
              <button 
                onClick={handleOrdersClick}
                className="w-full cursor-pointer px-6 py-3 bg-gray-100 hover:bg-gray-200 transition text-gray-700 rounded-full text-sm"
              >
                My Orders
              </button>
              <button 
                onClick={handleLogout}
                disabled={loggingOut}
                className={`w-full cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm ${
                  loggingOut ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar