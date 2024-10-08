import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux"; 
import { store } from "./components/store/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
      <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
        </main>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
