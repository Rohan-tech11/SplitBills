import { useRoutes } from "react-router-dom";
//import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import configData from "./config.json";
import Login from "./components/login";

export default function Router() {
  return useRoutes([
    {
      path: configData.LOGIN_URL,
      element: <Login />,
      //children: [{ path: "", element: <Login /> }],
    },
  ]);
}
