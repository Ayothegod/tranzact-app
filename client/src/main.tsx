import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout, { MainLayoutError } from "./layouts/MainLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Root, { RootError, Loader as rootLoader } from "./routes/root.tsx";
import LearnSwr, {
  ErrorBoundary,
  Loader as swrLoader,
} from "./routes/test-action.tsx";
import Learn from "./routes/learn.tsx";
import Dashboard, { Loader as dashboardLoader } from "./routes/dashboard.tsx";
import Transactions, {
  Loader as transactionLoader,
} from "./routes/transactions.tsx";
import Register from "./routes/register.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Login, { Loader as loginLoader } from "./routes/login.tsx";
import Account, { Loader as accountLoader } from "./routes/account.tsx";
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
    element: <Learn />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <MainLayout />,
    errorElement: <MainLayoutError />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "/transactions",
        element: <Transactions />,
        loader: transactionLoader,
      },
      {
        path: "/account",
        element: <Account />,
        loader: accountLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <React.StrictMode>
  <HelmetProvider>
    <RootLayout>
      <RouterProvider router={router} />
      <Toaster />
    </RootLayout>
  </HelmetProvider>
  //   </React.StrictMode>
);
