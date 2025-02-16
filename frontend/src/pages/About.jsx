import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
    // Floating animation effect
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY * 0.2);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-6 relative overflow-hidden">
            {/* Parallax Floating Elements */}
            
            <motion.div
                className="absolute top-10 left-10 w-36 h-36 bg-gradient-to-br from-green-300 to-teal-300 rounded-full blur-3xl opacity-40"
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ transform: `translateY(${offset}px)` }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-bl from-green-300 to-teal-300 rounded-full blur-3xl opacity-40"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ transform: `translateY(${offset}px)` }}
            />

            <motion.div 
                className="max-w-6xl w-full bg-white shadow-xl rounded-3xl p-12 space-y-12 relative overflow-hidden border border-teal-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ boxShadow: "0px 0px 20px rgba(34, 238, 153, 0.5)" }}
            >
                {/* About Us Section */}
                <section className="text-center">
                    <motion.h2 
                        className="text-5xl font-bold text-gray-800 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                          <svg
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-20"
            width="700"
            height="700"
            viewBox="0 0 700 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 600 C300 100, 600 100, 700 600"
                stroke=" rgba(28, 221, 141, 0.76)"
                strokeWidth="120"
                strokeLinecap="round"
            />
        </svg>

                        About Us
                    </motion.h2>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10">
                        <motion.div
                            className="w-52 h-52 rounded-xl bg-gray-300 shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img 
                                src="../logo.png" 
                                alt="Mandi Hub" 
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </motion.div>
                        <motion.div 
                            className="text-gray-700 md:w-3/5 space-y-4 text-lg leading-relaxed"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>
                                <strong>Mandi Hub.in</strong> is a revolutionary platform dedicated to connecting farmers, transportation services, and businesses within the same region. Our mission is to streamline the agricultural supply chain, ensuring fresh products reach businesses efficiently.
                            </p>
                            <p>
                                Founded in 2024, Mandi Hub.in has rapidly grown to become a trusted name in the agricultural community. We believe in fostering sustainable practices and supporting local economies by providing a seamless platform for all stakeholders.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Message from the Team */}
                <section className="relative p-10 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl border-2 border-emerald-400 shadow-lg">
                    <div className="absolute w-12 h-12 -top-6 -left-6 rounded-full bg-indigo-400 opacity-30 animate-pulse" />
                    <motion.h2 
                        className="text-4xl font-bold text-gray-800 text-center mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        Message from the Team
                    </motion.h2>
                    <motion.div 
                        className="text-gray-700 space-y-6 text-xl leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <p>
                            At <strong>Mandi Hub.in</strong>, we are passionate about revolutionizing the agricultural industry. Our team is committed to creating a platform that bridges the gap between farmers, transportation services, and businesses, making the supply chain more efficient and effective.
                        </p>
                        <p>
                            Our vision is to build a sustainable future where fresh, local produce is accessible to all, and where farmers can thrive by reaching wider markets. Thank you for being part of our journey. Together, we can create a better, more connected agricultural world.
                        </p>
                        <p className="text-lg italic text-right font-semibold">— Mandi Hub.in Team</p>
                    </motion.div>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-indigo-400 opacity-30 animate-pulse" />
                </section>
            </motion.div>
        </div>
    );
};

export default About;
