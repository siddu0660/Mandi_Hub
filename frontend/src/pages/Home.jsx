import { motion } from "framer-motion";

function Home() {
    const features = [
        {
            title: "Farmers/Mandi",
            description:
                "List and manage your products easily, connecting with transportation and businesses.",
        },
        {
            title: "Transportation",
            description:
                "Efficiently transport products from farms to businesses, ensuring timely delivery.",
        },
        {
            title: "Businesses",
            description:
                "Explore a wide range of fresh farm products and place orders seamlessly.",
        },
    ];

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('https://t3.ftcdn.net/jpg/09/57/80/90/360_F_957809002_OjKjBtv6m7oOVtgGgZ4EKYQvaHPacXQ3.jpg')",
            }}
        >
            {/* Overlay for readability */}
            <div className="bg-black bg-opacity-50 min-h-screen">
                {/* Hero Section */}
                <section className="text-white py-16 text-center px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Welcome to Mandi Hub.in
                        </motion.h2>
                        <motion.p
                            className="text-lg md:text-xl mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            Your platform for connecting farmers, transportation, and businesses.
                        </motion.p>
                        <motion.a
                            className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-100 transition inline-block"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href="#features"
                        >
                            Explore !!!
                        </motion.a>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-8 text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Key Features
                        </motion.h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-green-100 shadow-lg p-6 rounded-xl hover:shadow-2xl transition cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
