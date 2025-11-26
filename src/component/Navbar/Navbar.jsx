'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../app/context/AuthContext.jsx'; 
import toast from 'react-hot-toast';
import { Menu, X, LogIn, LogOut, PlusCircle, LayoutDashboard, Home, ShoppingCart, Info, Phone } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const NavLink = ({ href, children, onClick, icon: Icon, active }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`${
      active ? "text-blue-400 font-semibold" : "text-gray-200"
    } hover:text-blue-400 font-medium transition duration-150 py-2 md:py-0 flex items-center space-x-2`}
  >
    {Icon && <Icon size={18} />}
    <span>{children}</span>
  </Link>
);

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      closeMobileMenu();
      router.push('/');
    } catch (error) {
      toast.error("Logout failed.");
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-gray-900 border-b border-gray-800 transition-colors duration-300">
      <div className="w-10/12 max-w-[1200px] mx-auto flex justify-between items-center h-16">

        <Link href="/" className="flex items-center text-2xl font-extrabold text-blue-400">
          Fylo<span className="text-gray-100">Tech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink href="/" icon={Home} active={pathname === "/"}>Home</NavLink>
          <NavLink href="/products" icon={ShoppingCart} active={pathname === "/products"}>Products</NavLink>
          <NavLink href="/about" icon={Info} active={pathname === "/about"}>About Us</NavLink>
          <NavLink href="/contact" icon={Phone} active={pathname === "/contact"}>Contact</NavLink>
          <NavLink href="/faq" active={pathname === "/faq"}>FAQ</NavLink>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <Link href="/login" className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-md text-sm flex items-center space-x-2">
              <LogIn size={18} />
              <span>Login / Register</span>
            </Link>
          ) : (
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="flex items-center space-x-2 p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition focus:outline-none border border-gray-700 overflow-hidden"
              >
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-sm font-semibold truncate text-gray-100">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link href="/add-product" onClick={closeMobileMenu} className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-700">
                      <PlusCircle size={16} className="mr-3 text-green-400" /> Add Product
                    </Link>
                    <Link href="/manage-products" onClick={closeMobileMenu} className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-700">
                      <LayoutDashboard size={16} className="mr-3 text-purple-400" /> Manage Products
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-700 border-t border-gray-700 mt-1">
                      <LogOut size={16} className="mr-3" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-gray-200 hover:text-blue-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t py-4 px-4 bg-gray-900 shadow-xl transition-colors duration-300 w-10/12 max-w-[1200px] mx-auto">
          <NavLink href="/" onClick={closeMobileMenu} icon={Home} active={pathname === "/"}>Home</NavLink>
          <NavLink href="/products" onClick={closeMobileMenu} icon={ShoppingCart} active={pathname === "/products"}>Products</NavLink>
          <NavLink href="/about" onClick={closeMobileMenu} icon={Info} active={pathname === "/about"}>About Us</NavLink>
          <NavLink href="/contact" onClick={closeMobileMenu} icon={Phone} active={pathname === "/contact"}>Contact</NavLink>
          <NavLink href="/faq" onClick={closeMobileMenu} active={pathname === "/faq"}>FAQ</NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
