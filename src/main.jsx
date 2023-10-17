import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TokenContextProvider from "./Context/UserContext.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the CSS
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="317861228219-rp05oc8tu4p8gc271dhijvjevdaquqd1.apps.googleusercontent.com">
      <TokenContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TokenContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
