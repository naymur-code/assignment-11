import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../layout/DashboardLayout";
import MainDashboard from "../pages/dashboard/MainDashboard";
import MangeProducts from "../pages/dashboard/MangeProducts";
import AddRequest from "../pages/dashboard/AddRequest";
import AllUsers from "../pages/dashboard/AllUsers";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: (
      <h1 className="text-center py-20 text-4xl font-bold text-red-500">
        ERROR PAGE!
      </h1>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRouter>
      <DashboardLayout />
    </PrivateRouter>, children: [
      { index: true, element: <MainDashboard /> },
      { path: '/dashboard/main', element: <MainDashboard /> },
      { path: '/dashboard/add-request', element: <AddRequest /> },
      { path: '/dashboard/mange-product', element: <MangeProducts /> },
      {
        path: '/dashboard/all-users', element:
          <AllUsers />
      }
    ]
  }
]);

export default router;
