import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import RootLayout from "./layouts/RootLayout.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import App from "./app.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <React.StrictMode>
  <HelmetProvider>
    <RootLayout>
      <App />
      <Toaster />
    </RootLayout>
  </HelmetProvider>
  //   </React.StrictMode>
);

