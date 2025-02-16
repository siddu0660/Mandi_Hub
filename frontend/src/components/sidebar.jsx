import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth } from "../store/authSlice";
import { LogOut, User } from "lucide-react";

function Sidebar() {
    const name = useSelector((state) => state.auth.name);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetAuth());
    };

    return (
        <div className="w-56 rounded-2xl p-5 m-4 bg-slate-800 text-white flex flex-col shadow-lg">
            {/* Profile Section */}
            <div className="p-4 flex flex-col items-center border-b border-slate-600">
                <div className="w-14 h-14 bg-slate-600 rounded-full flex items-center justify-center text-lg">
                    <User className="text-white" size={28} />
                </div>
                <h2 className="text-sm font-semibold text-center mt-2">{name || "User Name"}</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 mt-3">
            <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isActive ? "bg-slate-700 text-white" : "hover:bg-slate-700"
                        }`
                    }
                    aria-label="Profile Information"
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isActive ? "bg-slate-700 text-white" : "hover:bg-slate-700"
                        }`
                    }
                    aria-label="Dashboard"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isActive ? "bg-slate-700 text-white" : "hover:bg-slate-700"
                        }`
                    }
                    aria-label="Explore"
                >
                    Explore
                </NavLink>

               

                {/* Logout Button */}
                <button
                    className="flex items-center justify-center w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 bg-red-600 hover:bg-red-700 mt-3"
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    <LogOut className="mr-2" size={18} />
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Sidebar;
