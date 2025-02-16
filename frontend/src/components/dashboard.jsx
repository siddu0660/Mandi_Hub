import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { getUserProfile } from "../store/authSlice";
import Sidebar from "../components/sidebar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [currProdId, setCurrProdId] = useState(null);
    const userCode = useSelector((state) => state.auth.uid);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/fetchProducts`, { params: { userCode } });
                const products = response.data;

                const enhancedProducts = await Promise.all(
                    products.map(async (product) => {
                        try {
                            const addedByDetails = await getUserProfile(product.addedBy);
                            const broughtByDetails = await getUserProfile(product.broughtBy);
                            const transportedByDetails = await getUserProfile(product.transportedBy);
                            return { ...product, addedByDetails, broughtByDetails, transportedByDetails };
                        } catch (error) {
                            console.error("Error fetching user profiles", error);
                            return { ...product, addedByDetails: null, broughtByDetails: null, transportedByDetails: null };
                        }
                    })
                );
                setProducts(enhancedProducts);
            } catch (error) {
                console.error("Error fetching products:", error.response || error.message);
            }
        };
        fetchProducts();
    }, [userCode]);

    const handleViewRequests = (product) => {
        if (product.addedBy !== userCode && product.broughtBy !== userCode) {
            alert("You can only view requests for products that you have added or brought.");
            return;
        }
        setCurrProdId(product.id);
        setSelectedRequests(product.serviceRequests || []);
        setIsDialogOpen(true);
    };

    const handleAcceptRequest = async (requesterId) => {
        try {
            await axios.post(`${BACKEND_URL}/api/updateProduct`, {
                productId: currProdId,
                transporterId: requesterId,
            });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === currProdId ? { ...product, transportedBy: requesterId } : product
                )
            );
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error updating product:", error.response || error.message);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-72 h-screen text-white p-4">
            <Sidebar />
            </div>
            <main className="flex-1 p-6 overflow-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">My Products</h2>
                <div className="mt-6 flex flex-col space-y-4 max-h-[500px] overflow-y-auto">
                    <ul className="my-4 flex flex-wrap gap-8">
                        {products
                            .filter((product) => product.broughtBy === userCode || product.addedBy === userCode)
                            .map((product) => (
                                <li key={product.id} className="p-6 bg-white rounded-lg shadow-md w-80">
                                    <h4 className="font-bold text-gray-800">{product.productName}</h4>
                                    <p className="text-gray-600">Type: {product.productType}</p>
                                    <p className="text-gray-600">Quality: {product.quality}</p>
                                    <p className="text-gray-600">Duration: {product.duration} days</p>
                                    <p className="text-gray-600">Price: ₹{product.price}</p>
                                    {product.addedBy === userCode && (
                                        <p className="text-gray-600">Brought By: {product.broughtByDetails?.name || product.broughtBy}</p>
                                    )}
                                    {product.broughtBy === userCode && (
                                        <p className="text-gray-600">Added By: {product.addedByDetails?.name || product.addedBy}</p>
                                    )}
                                    {product.transportedBy === "" ? (
                                        <button className="bg-cyan-700 p-2 rounded-xl my-2 text-white" onClick={() => handleViewRequests(product)}>
                                            View Requests
                                        </button>
                                    ) : (
                                        <p className="text-gray-600">Transported By: {product.transportedByDetails?.name || product.transportedBy}</p>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <Dialog.Title className="text-xl font-bold">Service Requests</Dialog.Title>
                            <div className="mt-4 space-y-2">
                                {selectedRequests.length > 0 ? (
                                    selectedRequests.map((request, index) => (
                                        <div key={index} className="p-2 border-b flex justify-between items-center">
                                            <div>
                                                <p><strong>Request Type:</strong> {request.requestType}</p>
                                                <p><strong>Requester ID:</strong> {request.requesterId}</p>
                                                <p><strong>Timestamp:</strong> {new Date(request.timestamp).toLocaleString()}</p>
                                            </div>
                                            <button
                                                className="bg-green-600 text-white py-1 px-3 rounded"
                                                onClick={() => handleAcceptRequest(request.requesterId)}
                                            >
                                                Accept
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No requests available for this product.</p>
                                )}
                            </div>
                            <button onClick={() => setIsDialogOpen(false)} className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white">
                                Close
                            </button>
                        </div>
                    </div>
                </Dialog>
            </main>
        </div>
    );
}

export default Dashboard;
