import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./store/auth-context";

// TODO: Can create the debug object per the env
// If is dev mode
const isDevEnv = true;
if (isDevEnv) {
    window.debug = {};
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthContextProvider>
);
