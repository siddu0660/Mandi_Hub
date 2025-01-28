import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const uid = useSelector((state) => state.auth.uid);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        // Structure the request body to match backend expectations
        const requestBody = {
            userCode: uid,
            formData: formData // Nesting the form data as expected by backend
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/api/query`, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) { // Backend returns 201 for successful creation
                setSuccess("Message sent successfully!");
                setFormData({
                    name: "",
                    number: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                setError("Failed to send the message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            
            if (error.response) {
                // Use the error message from the backend if available
                setError(error.response.data.message || "Failed to submit form");
            } else if (error.code === "ERR_NETWORK") {
                setError("Unable to connect to the server. Please check your internet connection and try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="scale-90 flex items-center justify-center">
            <div className="w-3/4 bg-white p-8 shadow-xl m-4 border-2 rounded-lg">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-gray-700 text-center mb-8">
                    We'd love to hear from you! Fill out the form below to get in touch with us.
                </p>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                        {success}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="number"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Your Mobile Number
                            </label>
                            <input
                                type="tel"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter your mobile number"
                                pattern="[0-9]{10}"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-lg font-medium text-gray-800 mb-2"
                            >
                                Your Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter your subject"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-lg font-medium text-gray-800 mb-2"
                        >
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Write your message here"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;