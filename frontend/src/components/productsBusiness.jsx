import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUserProfile } from "../store/authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductsB() {
  const [products, setProducts] = useState([]);
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
            return { ...product, addedByDetails };
          } catch (error) {
            console.error(
              `Error fetching user profile for UID: ${product.addedBy}`,
              error
            );
            return { ...product, addedByDetails: null };
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

  const handleRequestService = async (productId) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/processRequest`, {
        productId,
        userCode,
        type: "level 1",
      });

      alert("Service request processed successfully");
      fetchProducts();
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="relative p-6 m-6 flex flex-col bg-slate-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Product Management
      </h2>

      <div className="mt-6 flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold mb-2">Available Products</h3>
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <ul className="my-4 flex flex-grow gap-8">
            {products
              .filter(
                (product) =>
                  !product.broughtBy || product.broughtBy.trim() === ""
              )
              .map((product, index) => {
                const hasRequested =
                  product.productRequests?.some(
                    (request) => request.requesterId === userCode
                  ) || false;

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
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>
                        <strong>Requests:</strong>{" "}
                        {product.productRequests?.length || 0}
                      </p>
                      {product.addedByDetails && (
                        <>
                          <p>
                            <strong>Farmer:</strong>{" "}
                            {product.addedByDetails.name || "Not Available"}
                          </p>
                          <p>
                            <strong>Contact:</strong>{" "}
                            {product.addedByDetails.contact || "Not Available"}
                          </p>
                        </>
                      )}
                    </div>

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
      </div>
    </div>
  );
}

export default ProductsB;