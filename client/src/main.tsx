import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Root from "./routes/root.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import LearnSwr from "./routes/test-action.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/learnswr",
    element: <LearnSwr />,
  },
  // define other routes eg login/register
  {
    element: <MainLayout />,
    children: [
      // define routes with the same layout
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "/messages",
      //   element: <Messages />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </React.StrictMode>
);
