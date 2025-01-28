const express = require("express");
const session = require("express-session");
const cors = require('cors');
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const db = require("./config/firebase.js");
const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: [
      process.env.URL_PROD,
      process.env.URL_DEV,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: true,
    },
  })
);

app.use(express.json());
app.use(bodyParser.json());

let products = [];

app.get("/api/fetchProducts", async (req, res) => {
  const { userCode } = req.query;

  console.log(`Received GET request for products with userCode: ${userCode}`);

  try {
    const productsRef = db.ref("products");
    const snapshot = await productsRef.once("value");
    const productsData = snapshot.val();

    if (!productsData) {
      return res.status(404).json({ message: "No products found" });
    }

    const productsList = Object.entries(productsData).map(([id, product]) => ({
      id,
      ...product.productData,
    }));

    res.status(200).json(productsList);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.post("/api/products", async (req, res) => {
  const { userCode, ...productData } = req.body;

  console.log(`Received POST request with userCode: ${userCode}`);
  console.log("Product data:", productData);

  try {
    const productId = uuidv4();
    const productRef = db.ref("products/" + productId);

    const newProductData = {
      ...productData,
      addedBy: userCode,
      transportedBy: "",
      broughtBy: "",
    }

    await productRef.set({
      productData: newProductData,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", id: productId });
    products.push({ id: productId, ...newProductData });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { userCode, ...productData } = req.body;

  console.log(
    `Received PUT request for product ID: ${id} with userCode: ${userCode}`
  );
  console.log("Updated product data:", productData);

  try {
    const productRef = db.ref(`products/${id}`);

    const snapshot = await productRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProductData = {
      ...productData,
      addedBy: userCode,
      transportedBy: "",
      broughtBy: "",
    };

    await productRef.update({
      productData: updatedProductData,
    });

    console.log("Product updated successfully in the database.");

    res.status(200).json({ id, ...updatedProductData });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

app.delete("/api/delete", async (req, res) => {
  const { id } = req.body;

  console.log(`Received DELETE request for product ID: ${id}`);

  try {
    const productRef = db.ref(`products/${id}`);

    const snapshot = await productRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRef.remove();

    console.log("Product deleted successfully from the database.");

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

app.post("/api/processRequest", async (req, res) => {
  const { productId, userCode, type } = req.body;

  console.log(
    `Received POST request for service with productId: ${productId} from userCode: ${userCode}`
  );

  try {
    const productRef = db.ref(`products/${productId}`);

    const snapshot = await productRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productData = snapshot.val().productData;

    if(type === "level 1")
    {
      if (productData.productRequests) {
        const existingRequest = productData.productRequests.find(
          (request) => request.requesterId === userCode
        );

        if (existingRequest) {
          return res
            .status(400)
            .json({
              message: "You have already made a service request for this product",
            });
        }
      }

      if (!productData.productRequests) {
        productData.productRequests = [];
      }

      productData.productRequests.push({
        requesterId: userCode,
        requestType: type,
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
      });

      await productRef.update({
        productData: productData,
      });

      console.log("Service request added successfully.");

      res.status(200).json({ message: "Service request processed successfully" });
    }
    else
    {
      if (productData.serviceRequests) {
        const existingRequest = productData.serviceRequests.find(
          (request) => request.requesterId === userCode
        );

        if (existingRequest) {
          return res.status(400).json({
            message: "You have already made a service request for this product",
          });
        }
      }

      if (!productData.serviceRequests) {
        productData.serviceRequests = [];
      }

      productData.serviceRequests.push({
        requesterId: userCode,
        requestType: type,
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
      });

      await productRef.update({
        productData: productData,
      });

      console.log("Service request added successfully.");

      res
        .status(200)
        .json({ message: "Service request processed successfully" });
    }
  } catch (error) {
    console.error("Error processing service request:", error);
    res.status(500).json({ message: "Failed to process service request" });
  }
});

app.post("/api/handleProdRequest", async (req, res) => {
  const { productId, requestId, action } = req.body;

  try {
    const productRef = db.ref(`products/${productId}`);
    const snapshot = await productRef.once("value");

    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const productData = snapshot.val().productData;

    if (!productData.productRequests) {
      return res
        .status(404)
        .json({ success: false, message: "No requests found for the product" });
    }

    const requestIndex = productData.productRequests.findIndex(
      (request) => request.requestId === requestId
    );

    if (requestIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    if (action === "accept") {
      const acceptedRequest = productData.productRequests[requestIndex];

      productData.broughtBy = acceptedRequest.requesterId;
      productData.productRequests = [];

      await productRef.update({ productData });

      return res.status(200).json({
        success: true,
        message: "Request accepted and product updated successfully",
      });
    } else if (action === "decline") {
      productData.productRequests.splice(requestIndex, 1);

      await productRef.update({ productData });

      return res.status(200).json({
        success: true,
        message: "Request declined and removed successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action specified" });
    }
  } catch (error) {
    console.error("Error handling product request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to handle product request" });
  }
});

app.post("/api/handleServiceRequest", async (req, res) => {
  const { productId, requestId, action } = req.body;

  try {
    const productRef = db.ref(`products/${productId}`);
    const snapshot = await productRef.once("value");

    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const productData = snapshot.val().productData;

    if (!productData.serviceRequests) {
      return res
        .status(404)
        .json({ success: false, message: "No requests found for the product" });
    }

    const requestIndex = productData.serviceRequests.findIndex(
      (request) => request.requestId === requestId
    );

    if (requestIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    if (action === "accept") {
      const acceptedRequest = productData.serviceRequests[requestIndex];

      productData.transportedBy = acceptedRequest.requesterId;
      productData.serviceRequests = [];

      await productRef.update({ productData });

      return res.status(200).json({
        success: true,
        message: "Request accepted and product updated successfully",
      });
    } else if (action === "decline") {
      productData.serviceRequests.splice(requestIndex, 1);

      await productRef.update({ productData });

      return res.status(200).json({
        success: true,
        message: "Request declined and removed successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action specified" });
    }
  } catch (error) {
    console.error("Error handling product request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to handle product request" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});