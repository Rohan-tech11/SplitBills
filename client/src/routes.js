import { useRoutes } from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import configData from "./config.json";
import Login from "./components/login";
import Register from "./components/register";

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
  ]);
}
