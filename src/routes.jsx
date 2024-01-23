import { Applications } from "./assets/pages/dashboard/applications";
import { Users } from "./assets/pages/dashboard/users";
import { Dashboard } from "./assets/pages/dashboard";
import { ApplicationsAdd } from "./assets/pages/dashboard/applicationsAdd";
import { ApplicationsEdit } from "./assets/pages/dashboard/applicationsEdit";
import { UserAdd } from "./assets/pages/dashboard/usersAdd";
import { UserEdit } from "./assets/pages/dashboard/usersEdit";
import { VirtualMachine } from "./assets/pages/dashboard/virtualMachine";
import AppDetail from "./assets/pages/landingPage/appDetail";
import AuthLayout from "./assets/layouts/authenticated";
import { Navigate } from "react-router-dom";
import { VirtualMachineAdd } from "./assets/pages/dashboard/virtualMachineAdd";
import LandingPage from "./assets/pages/landingPage";
import { VirtualMachineEdit } from "./assets/pages/dashboard/virtualMachineEdit";

const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          name: "dashboard",
          path: "/",
          element: <Dashboard />,
        },
        {
          name: "applications",
          path: "/applications",
          element: <Applications />,
        },
        {
          name: "applications add",
          path: "/applications/add",
          element: <ApplicationsAdd />,
        },
        {
          
          name: "applications edit",
          path: `/applications/edit/:id`,
          element: <ApplicationsEdit />,
        },
        {
          name: "application detail",
          path: "/applications/detail/:id",
          element: <AppDetail />,
        },
        {
          name: "users",
          path: "/users",
          element: <Users />,
        },
        ,
        {
          name: "user add",
          path: "/users/add",
          element: <UserAdd />,
        },
        {
          
          name: "user edit",
          path: `/users/edit/:id`,
          element: <UserEdit />,
        },
        {
          name: "virtual machines",
          path: `/virtual_machines`,
          element: <VirtualMachine />,
        },
        {
          name: "virtual machines add",
          path: `/virtual_machines/add`,
          element: <VirtualMachineAdd />,
        },
        {
          name: "virtual machines edit",
          path: `/virtual_machines/edit/:id`,
          element: <VirtualMachineEdit />,
        },
        {
          name: "not found",
          path: `/*`,
          element: <Navigate to="/dashboard" replace />,
        },
      ],
    },
    {
      layout: "/",
      pages: [
        {
          name: "LANDING PAGE",
          path: "/",
          element: <LandingPage />,
        },
        {
          name: "Detail App",
          path: "/application/:id",
          element: <AppDetail />,
        },
        ,
        {
          name: "not found",
          path: `/*`,
          element: <Navigate to="/dashboard" replace />,
        },
      ],
    }
  ];

export default routes;