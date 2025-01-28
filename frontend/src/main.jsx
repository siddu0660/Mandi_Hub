import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./store/store";
import './index.css'
import App from './App.jsx'
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/auth" element={<Login/>} />
          </Routes>
        </PersistGate>
      </Provider>
    </Router>
  </StrictMode>
);
