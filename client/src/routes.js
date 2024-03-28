import { useRoutes } from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import configData from "./config.json";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CreateGroup from "./components/groups/createGroups";
import ViewGroup from "./components/groups/viewGroup";
import Group from "./components/groups";
import { EditGroup } from "./components/groups/editGroup";
import AddExpense from "./components/expense/addExpense";

import DashboardLayout from "./layouts/dashboard";
import React from "react";

export default function Router() {
  return useRoutes([
    {
      path: configData.DASHBOARD_HOME_URL,
      element: <DashboardLayout />,
      children: [
        { path: configData.CREATE_GROUP_URL, element: <CreateGroup /> },
        { path: configData.VIEW_GROUP_ROUTER_URL, element: <ViewGroup /> },
        { path: configData.USER_GROUPS_URL, element: <Group /> },
        { path: configData.EDIT_GROUP_ROUTER_URL, element: <EditGroup /> },
        { path: configData.ADD_EXPENSE_ROUTER_URL, element: <AddExpense /> },
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
