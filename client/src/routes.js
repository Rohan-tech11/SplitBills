import { useRoutes } from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import configData from "./config.json";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import DashboardLayout from "./layouts/dashboard";
export default function Router() {
  return useRoutes([
    {
      path: configData.LOGIN_URL,
      element: <LogoOnlyLayout />,
      children: [
        { path: "", element: <Login /> },
        { path: configData.REGISTER_URL, element: <Register /> },
      ],
    },
    {
      path: configData.DASHBOARD_HOME_URL,
      element: <DashboardLayout />,
    },
  ]);
}
