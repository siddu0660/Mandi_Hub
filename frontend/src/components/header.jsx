import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth.status);
    return (
        <div className="p-2 flex bg-slate-700 justify-between">
            <div>
                <NavLink key={"/"} to={"/"}>
                    <span className="p-2 text-white font-bold text-2xl">
                        Mandi Hub.in
                    </span>
                </NavLink>
            </div>
            <div className="flex items-center">
                <nav className="flex space-x-4">
                    {[
                        { to: "/about", text: "About Us" },
                        { to: "/contact", text: "Contact Us" },
                        authState ? { to: "/profile", text: "Profile" } : { to: "/auth", text: "Login / Signup" }
                    ].map(({ to, text }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className="flex items-center py-2 px-4 rounded-3xl transition-colors duration-300 text-white hover:bg-slate-500"
                        >
                            <span className="whitespace-nowrap">{text}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Header;
