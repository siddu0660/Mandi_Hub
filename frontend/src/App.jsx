import { Routes , Route , Navigate } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import "./index.css"
import Profile from "./pages/Profile"
import Dashboard from "./components/dashboard";
import Settings from "./components/settings";
import ProductsF from "./components/productsFarmer";
import ProductsB from "./components/productsBusiness";
import Services from "./components/services";
import { useSelector } from "react-redux"
import PropTypes from "prop-types";
import { useEffect } from "react"

const ProtectedRoute = ({ type, allowedTypes, children }) => {
  if (!allowedTypes.includes(type)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  type: PropTypes.string.isRequired,
  allowedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

function App () {
  const type = useSelector((state) => state.auth.type);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                type={type}
                allowedTypes={["farmer", "transporter", "business"]}
              >
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                type={type}
                allowedTypes={["farmer", "transporter", "business"]}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute
                type={type}
                allowedTypes={["farmer", "transporter", "business"]}
              >
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute
                type={type}
                allowedTypes={["farmer", "business", "transporter"]}
              >
                { type === "transporter" ? <Services /> : type === "farmer" ? <ProductsF /> : <ProductsB /> }
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App