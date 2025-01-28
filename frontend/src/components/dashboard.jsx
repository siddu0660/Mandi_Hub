import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { getUserProfile } from "../store/authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [currProdId, setCurrProdId] = useState(null);
    const userCode = useSelector((state) => state.auth.uid);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/fetchProducts`, {
            params: { userCode },
            });

            const products = response.data;

            const enhancedProducts = await Promise.all(
            products.map(async (product) => {
                try {
                const addedByDetails = await getUserProfile(product.addedBy);
                const broughtByDetails = await getUserProfile(product.broughtBy);
                const transportedByDetails = await getUserProfile(product.transportedBy);
                return { ...product, addedByDetails, broughtByDetails, transportedByDetails };
                } catch (error) {
                console.error(
                    `Error fetching user profiles`,
                    error
                );
                return { ...product, addedByDetails: null, broughtByDetails: null, transportedByDetails: null };
                }
            })
            );

            setProducts(enhancedProducts);
        } catch (error) {
            console.error(
            "Error fetching products:",
            error.response || error.message
            );
        }
    };

    useEffect(() => {
        fetchProducts();
    },[userCode])

    const handleViewRequests = (index) => {

        const product = products[index];

        if(product.addedBy !== userCode && product.broughtBy !== userCode)
        {
            alert("You can only view requests for products that you have added or brought.");
            return;
        }
        
        setCurrProdId(product.id);
        setSelectedRequests(product.serviceRequests || []);
        setIsDialogOpen(true);
        };


    const handleRequestAction = async (request, action) => {
        const requestId = request.requestId;
        const productId = currProdId;

        if (!productId || !requestId) {
            alert("Invalid request data. Please try again.");
            console.error("Invalid request data:", request);
            console.error("Product ID:", productId);
            return;
        }

        const confirmAction = window.confirm(
            `Are you sure you want to ${action} this request?`
        );

        if (!confirmAction) return;

        try {
            const response = await axios.post(
            `${BACKEND_URL}/api/handleServiceRequest`,
            {
                productId,
                requestId,
                action,
            }
            );

            if (response.data.success) {
            alert(`Request ${action}ed successfully.`);
            setSelectedRequests((prevRequests) =>
                prevRequests.filter((req) => req.requestId !== requestId)
            );
            } else {
            throw new Error(
                response.data.message || "Failed to process the request."
            );
            }
        } catch (error) {
            console.error(
            "Error processing request:",
            error.response?.data || error.message
            );
            alert("Failed to process the request. Please try again.");
        }
    };

    return (
        <div className="relative p-6 m-6 flex flex-col bg-slate-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">My Products</h2>

            <div className="mt-6 flex flex-col">
            <div className="space-y-4 max-h-80 overflow-y-auto">
                <ul className="my-4 flex flex-grow gap-8">
                {products
                    .filter(
                    (product) =>
                        product.broughtBy === userCode ||
                        product.addedBy === userCode
                    )
                    .map((product, index) => {
                    return (
                        <li
                        key={index}
                        className="p-8 bg-slate-700 rounded-lg shadow flex flex-col"
                        >
                        <div>
                            <h4 className="font-bold text-white">
                            {product.productName}
                            </h4>
                            <p className="text-gray-300">
                            Type: {product.productType}
                            </p>
                            <p className="text-gray-300">
                            Quality: {product.quality}
                            </p>
                            <p className="text-gray-300">
                            Duration: {product.duration} days
                            </p>
                            <p className="text-gray-300">Price: ₹{product.price}</p>
                            
                            {product.addedBy === userCode && (
                                <p className="text-gray-300">Brought By: {product.broughtByDetails?.name || product.broughtBy}</p>
                            )}

                            {product.broughtBy === userCode && (
                                <p className="text-gray-300">Added By: {product.addedByDetails?.name || product.addedBy}</p>
                            )}

                            {product.transportedBy === "" && (
                            <button
                                className="bg-cyan-700 p-2 rounded-xl my-2"
                                onClick={() => handleViewRequests(index)}
                            >
                                View Requests
                            </button>
                            )}

                            {product.transportedBy !== "" && (
                                <p className="text-gray-300">Transported By: {product.transportedByDetails?.name || product.transportedBy}</p>
                            )}
                        </div>
                        </li>
                    );
                    })}
                </ul>
            </div>
            </div>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <Dialog.Title className="text-xl font-bold">
                        Service Requests
                    </Dialog.Title>
                    <div className="mt-4 space-y-2">
                        {selectedRequests.length > 0 ? (
                        selectedRequests.map((request, index) => (
                            <div key={index} className="p-2 border-b">
                            <p>
                                <strong>Request Type:</strong> {request.requestType}
                            </p>
                            <p>
                                <strong>Requester ID:</strong> {request.requesterId}
                            </p>
                            <p>
                                <strong>Timestamp:</strong>{" "}
                                {new Date(request.timestamp).toLocaleString()}
                            </p>
                            <div className="mt-2 flex gap-4">
                                <button
                                onClick={() =>
                                    handleRequestAction(
                                    { requestId: request.requestId },
                                    "accept"
                                    )
                                }
                                className="py-1 px-3 bg-green-600 hover:bg-green-500 rounded-lg text-white"
                                >
                                Accept
                                </button>
                                <button
                                onClick={() =>
                                    handleRequestAction(
                                    { requestId: request.requestId },
                                    "decline"
                                    )
                                }
                                className="py-1 px-3 bg-red-600 hover:bg-red-500 rounded-lg text-white"
                                >
                                Decline
                                </button>
                            </div>
                            </div>
                        ))
                        ) : (
                        <p>No requests available for this product.</p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
                    >
                        Close
                    </button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default Dashboard;
