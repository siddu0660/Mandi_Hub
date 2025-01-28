import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ProductForm from "./productForm";
import { useSelector } from "react-redux";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductsF() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [currProdId, setCurrProdId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const userCode = useSelector((state) => state.auth.uid);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/fetchProducts`, {
        params: { userCode },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (formData) => {
    const requestMethod = editIndex !== null ? "put" : "post";
    const endpoint =
      editIndex !== null
        ? `${BACKEND_URL}/api/products/${products[editIndex].id}`
        : `${BACKEND_URL}/api/products`;

    const productData = {
      ...formData,
      userCode,
    };

    try {
      const response = await axios({
        method: requestMethod,
        url: endpoint,
        data: productData,
      });

      if (editIndex !== null) {
        const updatedProduct = response.data;
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts];
          newProducts[editIndex] = {
            ...updatedProduct,
            addedBy: userCode,
          };
          return newProducts;
        });
      } else {
        fetchProducts();
      }

      resetForm();
    } catch (error) {
      console.error("Error saving product:", error.response || error.message);
    }
  };

  const handleEditProduct = (index) => {
    if (products[index].addedBy === userCode) {
      setEditIndex(index);
      setIsModalOpen(true);
    } else {
      alert("You can only edit products that you have added.");
    }
  };

  const handleDeleteProduct = async (index) => {
    const product = products[index];

    if (product.addedBy !== userCode) {
      alert("You can only delete products that you have added.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the product: "${product.productName}"?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/delete`, {
        data: { id: product.id },
      });

      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting product:", error.response || error.message);
      alert("Failed to delete the product. Please try again.");
    }
  };

  const handleViewRequests = (index) => {
    const product = products[index];
    if (product.addedBy !== userCode) {
      alert("You can only view requests for products that you have added.");
      return;
    }

    setCurrProdId(product.id);
    setSelectedRequests(product.productRequests || []);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const handleRequestAction = async (request, action) => {
    const requestId = request.requestId ;
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
        `${BACKEND_URL}/api/handleProdRequest`,
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
      <h2 className="text-2xl font-bold mb-4 text-center">
        Product Management
      </h2>

      <div className="mt-6 flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold mb-2">Listed Products</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg text-white font-bold"
          >
            Add Product
          </button>
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <ul className="flex gap-4 space-x-2">
            {products
              .filter(
                (product) =>
                  !product.broughtBy || product.broughtBy.trim() === ""
              )
              .map((product, index) => (
                <li
                  key={index}
                  className="p-4 bg-slate-700 h-full rounded-lg shadow flex justify-between items-center gap-12"
                >
                  <div>
                    <h4 className="font-bold text-white">
                      {product.productName}
                    </h4>
                    <p className="text-gray-300">Type: {product.productType}</p>
                    <p className="text-gray-300">Quality: {product.quality}</p>
                    <p className="text-gray-300">
                      Duration: {product.duration} days
                    </p>
                    <p className="text-gray-300">Price: ₹{product.price}</p>
                    {product.addedBy === userCode && (
                      <button
                        className="bg-cyan-700 p-2 rounded-xl my-2"
                        onClick={() => handleViewRequests(index)}
                      >
                        View Requests
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(index)}
                      className="py-1 px-3 bg-slate-600 hover:bg-slate-500 rounded-lg text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="py-1 px-3 bg-red-600 hover:bg-red-500 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <ProductForm
          isOpen={isModalOpen}
          onClose={resetForm}
          onSave={handleSaveProduct}
          initialData={editIndex !== null ? products[editIndex] : null}
        />
      )}

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

export default ProductsF;
