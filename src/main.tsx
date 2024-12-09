import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import { Carousel } from ".";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Carousel />
  </StrictMode>
);
