import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import UsersLayout from "../layouts/UsersLayout";


import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";

import User from "../views/users/User";
import UserForm from "../views/users/UserForm";
import UserShow from "../views/users/UserShow";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <UsersLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/users/create",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/update/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/users/:id",
        element: <UserShow />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      }
    ],
  },
]);

export default routes;
