import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Root, { RootError, Loader as rootLoader } from "./routes/root.tsx";
import Dashboard, { Loader as dashboardLoader } from "./routes/dashboard.tsx";
import Transactions, {
  Loader as transactionLoader,
} from "./routes/transactions.tsx";
import Register, { ErrorBoundary } from "./routes/register.tsx";
import Login, { Loader as loginLoader } from "./routes/login.tsx";
import Account, { Loader as accountLoader } from "./routes/account.tsx";
import Wallet from "./routes/wallet.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootError />,
    loader: rootLoader,
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
    errorElement: <ErrorBoundary />,
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
      {
        path: "/wallet",
        element: <Wallet />,
      },
    ],
  },
]);

export default function App() {
  // NOTE: make sure to add errorBoundary to all routes that throw error from loader and actions

  // what uis the difference btwn error element and error boundary in react router??
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
