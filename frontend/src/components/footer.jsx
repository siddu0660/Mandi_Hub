import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-4 border-t border-slate-700 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                {/* Copyright */}
                <span className="text-sm md:text-md font-semibold">
                    &copy; {new Date().getFullYear()} <span className="font-bold">Mandi Hub</span>. All rights reserved.
                </span>

                {/* Legal Links */}
                <nav className="flex space-x-4 mt-2 md:mt-0">
                    {/* <a href="/privacy" className="hover:text-gray-400 text-sm">Privacy Policy</a> */}
                    <a href="/terms" className="hover:text-gray-400 text-sm">Terms of Service</a>
                </nav>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-400">
                        <FaFacebook size={20} />
                    </a>
                    <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-400">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-gray-400">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
