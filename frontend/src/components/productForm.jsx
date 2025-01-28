import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

function ProductForm({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        productName: "",
        productType: "",
        quality: "",
        duration: "",
        price: "",
        image: null,
    });

    useEffect(() => {
        if (initialData) {
        setFormData(initialData);
        } else {
        resetForm();
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const resetForm = () => {
        setFormData({
        productName: "",
        productType: "",
        quality: "",
        duration: "",
        price: "",
        image: null,
        });
    };

    return (
        <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        >
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
            <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">
                {initialData ? "Edit Product" : "Add Product"}
            </h3>
            <button onClick={onClose} aria-label="Close">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-400 hover:text-red-500"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300">
                Product Name:
                </label>
                <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-slate-700 text-white focus:ring-2 focus:ring-slate-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">
                Product Type:
                </label>
                <input
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-slate-700 text-white focus:ring-2 focus:ring-slate-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">
                Quality:
                </label>
                <select
                name="quality"
                value={formData.quality}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-slate-700 text-white focus:ring-2 focus:ring-slate-500"
                required
                >
                <option value="" className="text-gray-400">
                    Select Quality
                </option>
                <option value="Quality 1">Quality 1</option>
                <option value="Quality 2">Quality 2</option>
                <option value="Quality 3">Quality 3</option>
                <option value="Quality 4">Quality 4</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">
                Duration (days):
                </label>
                <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-slate-700 text-white focus:ring-2 focus:ring-slate-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">
                Price (₹):
                </label>
                <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-slate-700 text-white focus:ring-2 focus:ring-slate-500"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">
                Product Image:
                </label>
                <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3 rounded bg-slate-700 text-white focus:ring-2 focus:ring-slate-500"
                />
            </div>
            <div className="flex justify-end">
                <button
                type="submit"
                className="py-2 px-4 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold"
                >
                {initialData ? "Save Changes" : "Add Product"}
                </button>
            </div>
            </form>
        </div>
        </Dialog>
    );
}

export default ProductForm;
