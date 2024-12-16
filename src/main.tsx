import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import View from "./View";
import ImageTest from "./example/ImageTest";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImageTest />
  </StrictMode>
);
