function Home () {
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
        <div className="bg-slate-100 min-h-screen">
            <section className="bg-green-600 text-white py-16 text-center">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Mandi Hub.in</h2>
                    <p className="text-lg mb-6">
                        Your platform for connecting farmers, transportation, and businesses.
                    </p>
                    <a
                        className="bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-green-100 transition"
                    >
                        Explore !!!
                    </a>
                </div>
            </section>
            <section id="features" className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl hover:scale-90 transition"
                            >
                                <h3 className="text-xl font-semibold mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700 mb-4">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home