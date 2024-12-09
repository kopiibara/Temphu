import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Adjust the path if needed
import "./index.css"; // Optional: global styles

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
