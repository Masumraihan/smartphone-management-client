import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SmartphoneManagement from "../pages/SmartphoneManagement/SmartphoneManagement";
import SalesManagement from "../pages/SalesManagement/SalesManagement";
import SalesHistory from "../pages/SalesHistory/SalesHistory";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <SmartphoneManagement />,
      },
      {
        path: "sales-management",
        element: <SalesManagement />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
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
