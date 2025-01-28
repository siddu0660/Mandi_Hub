import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserProfile } from "../store/authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Services() {
    const userCode = useSelector((state) => state.auth.uid);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BACKEND_URL}/api/fetchProducts`);
                const filteredProducts = response.data.filter(
                    (product) => product.addedBy && product.broughtBy
                );

                // Enhance products with user profiles
                const enhancedProducts = await Promise.all(
                    filteredProducts.map(async (product) => {
                        try {
                            const addedByDetails = await getUserProfile(product.addedBy);
                            const broughtByDetails = await getUserProfile(product.broughtBy);
                            return { ...product, addedByDetails, broughtByDetails };
                        } catch (error) {
                            console.error(`Error fetching user profile for UID: ${product.addedBy}`, error);
                            return { ...product, addedByDetails: null, broughtByDetails: null };
                        }
                    })
                );

                setProducts(enhancedProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        console.log(userCode);
    }, []);

    const handleRequestService = async (productId) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/processRequest`, {
                productId,
                userCode,
                type: "level 2",
            });

            alert("Service request processed successfully");
        } catch (error) {
            if (
                error.response &&
                error.response.data.message ===
                "You have already made a service request for this product"
            ) {
                alert("You have already requested a service for this product.");
            } else {
                console.error("Error processing service request:", error);
                alert("An error occurred while processing your request.");
            }
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    if (products.length === 0) {
        return <div className="text-center p-4">No products available for services.</div>;
    }

    return (
        <div className="p-4 bg-slate-100 min-h-screen rounded shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Services</h1>
            <ul className="w-fit p-4 space-y-4">
                {products.map((product) => {
                    const hasRequested = product.serviceRequests?.some(
                        (request) => request.requesterId === userCode
                    ) || false;
                    return (
                        <li key={product.id} className="p-4 bg-white rounded shadow">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {product.productName}
                            </h3>
                            <p className="text-gray-600">Type: {product.productType}</p>
                            <p className="text-gray-600">Quality: {product.quality}</p>
                            <p className="text-gray-600">Duration: {product.duration} days</p>
                            <p className="text-gray-600 mb-6">Price: ₹{product.price}</p>
                            
                            {product.addedByDetails && (
                                <>
                                    <p className="text-gray-600">
                                        <strong>Farmer:</strong> {product.addedByDetails.name || "Not Available"}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Contact:</strong> {product.addedByDetails.contact || "Not Available"}
                                    </p>
                                </>
                            )}

                            {product.broughtByDetails && (
                                <>
                                    <p className="text-gray-600">
                                        <strong>Business:</strong> {product.broughtByDetails.name || "Not Available"}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Contact:</strong> {product.broughtByDetails.contact || "Not Available"}
                                    </p>
                                </>
                            )}
                            
                            <p className="text-gray-600 mt-2">
                                <strong>Service Requests:</strong> {product.serviceRequests?.length || 0}
                            </p>
                            
                            {hasRequested ? (
                                <button
                                    disabled
                                    className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md cursor-not-allowed"
                                >
                                    Requested
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleRequestService(product.id)}
                                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Request Service
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Services;
