import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TokenContextProvider from "./Context/UserContext.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TokenContextProvider>
  </React.StrictMode>
);
