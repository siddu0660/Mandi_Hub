import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "", number: "", email: "", subject: "", message: "",
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

        const requestBody = { userCode: uid, formData };

        try {
            const response = await axios.post(`${BACKEND_URL}/api/query`, requestBody, {
                headers: { "Content-Type": "application/json" },
            });
            
            if (response.status === 201) {
                setSuccess("Message sent successfully!");
                setFormData({ name: "", number: "", email: "", subject: "", message: "" });
            } else {
                setError("Failed to send the message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            if (error.response) {
                setError(error.response.data.message || "Failed to submit form");
            } else if (error.code === "ERR_NETWORK") {
                setError("Unable to connect to the server. Check your internet connection.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 sm:p-8 bg-white min-h-screen">
            <div className="max-w-4xl w-full bg-green-100 p-8 shadow-lg border rounded-lg">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-gray-700 text-center mb-8">
                    We'd love to hear from you! Fill out the form below to get in touch.
                </p>
                {error && <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-600 text-red-800">{error}</div>}
                {success && <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-600 text-green-800">{success}</div>}
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-900">Your Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 bg-white" placeholder="Enter your full name" />
                        </div>
                        <div>
                            <label htmlFor="number" className="block text-lg font-medium text-gray-900">Mobile Number</label>
                            <input type="tel" id="number" name="number" value={formData.number} onChange={handleChange} required pattern="[0-9]{10}"
                                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 bg-white" placeholder="Enter your mobile number" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-900">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 bg-white" placeholder="Enter your email" />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-lg font-medium text-gray-900">Subject</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 bg-white" placeholder="Enter subject" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-medium text-gray-900">Message</label>
                        <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required
                            className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 bg-white" placeholder="Write your message here"></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" disabled={isSubmitting}
                            className="w-full sm:w-auto bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
