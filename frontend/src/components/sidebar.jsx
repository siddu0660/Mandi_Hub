import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth } from "../store/authSlice";

function Sidebar() {
    const name = useSelector((state) => state.auth.name);
    const dispatch = useDispatch();

    const handleLogout = () => {
        return () => {
            dispatch(resetAuth());
        };
    }

    return (
        <div className="w-48 rounded-2xl p-4 m-4 bg-slate-700 text-white flex flex-col">
            <div className="p-3 flex flex-col items-center border-b border-slate-600">
                
                <h2 className="text-sm font-bold text-center">{name || "User Name"}</h2>
            </div>
            <nav className="flex-1 p-3 space-y-1 my-3">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block py-2 px-3 rounded-lg text-sm transition-colors duration-300 ${isActive ? "bg-slate-500" : "hover:bg-slate-600"}`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `block py-2 px-3 rounded-lg text-sm transition-colors duration-300 ${isActive ? "bg-slate-500" : "hover:bg-slate-600"}`
                    }
                >
                    Explore
                </NavLink>
                <button className="block py-2 px-3 rounded-lg text-sm transition-colors duration-300 bg-slate-600" onClick={handleLogout()}>
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Sidebar;
