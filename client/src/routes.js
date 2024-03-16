import { useRoutes } from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import configData from "./config.json";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CreateGroup from "./components/groups/createGroups";

import DashboardLayout from "./layouts/dashboard";
import React from "react";

export default function Router() {
  return useRoutes([
    {
      path: configData.DASHBOARD_HOME_URL,
      element: <DashboardLayout />,
      children: [
        { path: configData.CREATE_GROUP_URL, element: <CreateGroup /> },
      ],
    },

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
