const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-20 pb-12">
            <section className="py-12">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                About Us
            </h2>
            <div className="flex flex-row justify-between gap-8">
                <p
                alt=""
                className="w-52 h-52 rounded-xl bg-slate-400 mx-auto my-auto shadow-2xl"
                />
                <div className="text-gray-700 w-1/2 space-y-4">
                <p className="text-lg">
                    Mandi Hub.in is a revolutionary platform dedicated to connecting farmers, transportation services, and businesses within the same region. Our mission is to streamline the agricultural supply chain, ensuring fresh products reach businesses efficiently.
                </p>
                <p className="text-lg">
                    Founded in 2024, Mandi Hub.in has rapidly grown to become a trusted name in the agricultural community. We believe in fostering sustainable practices and supporting local economies by providing a seamless platform for all stakeholders.
                </p>
                </div>
            </div>
            </section>

            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Message from the Team
            </h2>

            <section className="p-6 bg-emerald-100 rounded-xl border-2 shadow-md animate-pulse">
                <div className="absolute w-12 h-12 -top-6 -left-6 rounded-full bg-indigo-400 opacity-30"/>
                <div className="text-gray-700 m-6 space-y-6">
                    <p className="text-xl">
                    At Mandi Hub.in, we are passionate about revolutionizing the agricultural industry. Our team is committed to creating a platform that bridges the gap between farmers, transportation services, and businesses, making the supply chain more efficient and effective. We believe in the power of technology to transform traditional practices and are dedicated to supporting local communities through innovation and collaboration.
                    </p>
                    <p className="text-xl">
                    Our vision is to build a sustainable future where fresh, local produce is accessible to all, and where farmers can thrive by reaching wider markets. Thank you for being part of our journey. Together, we can create a better, more connected agricultural world.
                    </p>
                    <p className="text-lg italic text-right">
                    — Mandi Hub.in Team
                    </p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-indigo-400 opacity-30"/>
            </section>
        </div>
        </div>
    );
};

export default About;
