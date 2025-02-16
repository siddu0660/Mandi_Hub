import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";

function Profile() {
    const name = useSelector((state) => state.auth.name) || "User Name";
    const email = useSelector((state) => state.auth.email) || "user@example.com";
    const address = useSelector((state) => state.auth.address) || "Not Provided";

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-72 h-screen text-white p-4">
            <Sidebar />
            </div>
            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
                <p className="mt-2 text-gray-600">This is your profile page. You can manage your details here.</p>

                {/* Profile Card */}
                <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-medium text-gray-800">User Information</h2>
                    <p className="text-gray-600 mt-1">Details about the user will be displayed here.</p>
                    
                    {/* Example of User Details (Replace with real data) */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <span className="font-semibold w-32">Name:</span>
                            <span>{name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold w-32">Email:</span>
                            <span>{email}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold w-32">Address:</span>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
