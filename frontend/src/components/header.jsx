import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing icons for mobile menu

function Header() {
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth.status);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact Us" },
        authState ? { to: "/profile", text: "Profile" } : { to: "/auth", text: "Login / Signup" }
    ];

    return (
        <header className="bg-slate-800 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold tracking-wide">
                    Mandi Hub.in
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map(({ to, text }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-xl transition duration-300 ${
                                    isActive ? "bg-slate-600" : "hover:bg-slate-500"
                                }`
                            }
                            aria-current={to === window.location.pathname ? "page" : undefined}
                        >
                            {text}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 rounded-md hover:bg-slate-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 p-4">
                    {navLinks.map(({ to, text }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className="block py-2 px-4 text-white rounded-lg hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)} // Close menu on click
                        >
                            {text}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Header;
