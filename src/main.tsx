import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// import { canTransition } from "./utils/statusRule";

// (window as any).canTransition = canTransition;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
