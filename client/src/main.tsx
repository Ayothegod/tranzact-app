import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Root, { RootError, Loader as rootLoader } from "./routes/root.tsx";
import LearnSwr, {
	ErrorBoundary,
	Loader as swrLoader,
} from "./routes/test-action.tsx";
import Learn from "./routes/learn.tsx";
import Dashboard from "./routes/dashboard.tsx";
import Transactions from "./routes/transactions.tsx";
// NOTE: make sure to add errorBoundary to all routes that throw error from loader and actions

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootError />,
    loader: rootLoader,
  },
  {
    path: "/learnswr",
    element: <LearnSwr />,
    errorElement: <ErrorBoundary />,
    loader: swrLoader,
  },
  {
    path: "/learn",
    element: <Learn/>,
    errorElement: <ErrorBoundary />,
  },
  // define other routes eg login/register
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      // {
      //   path: "/messages",
      //   element: <Messages />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <React.StrictMode>
  <HelmetProvider>
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </HelmetProvider>
  //   </React.StrictMode>
);
