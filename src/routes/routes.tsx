import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SmartphoneManagement from "../pages/SmartphoneManagement/SmartphoneManagement";
import SalesManagement from "../pages/SalesManagement/SalesManagement";
import SalesHistory from "../pages/SalesHistory/SalesHistory";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Protected from "@/layout/mainLayout/Protected";
import { userRole } from "@/constant";
import UserManagement from "@/pages/UserManagement/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Protected roles={[userRole.superAdmin, userRole.manager]}>
            <SmartphoneManagement />
          </Protected>
        ),
      },
      {
        path: "sales-management",

        element: (
          <Protected roles={[userRole.superAdmin, userRole.seller]}>
            <SalesManagement />
          </Protected>
        ),
      },
      {
        path: "sales-history",
        element: (
          <Protected roles={[userRole.superAdmin, userRole.seller]}>
            <SalesHistory />,
          </Protected>
        ),
      },
      {
        path: "users",
        element: (
          <Protected roles={[userRole.superAdmin]}>
            <UserManagement />,
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
