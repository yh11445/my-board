import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import store from "./stores/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        onScriptLoadError={() => console.log("실패")}
        onScriptLoadSuccess={() => console.log("성공")}
      >
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
);
