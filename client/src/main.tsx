import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Root />,
  // },
  // {
  //   element: <MainLayout />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "/messages",
  //       element: <Messages />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RootLayout>
      <RouterProvider router={router} />
    </RootLayout> */}
  </React.StrictMode>
);
