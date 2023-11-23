import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import UsersLayout from "../layouts/UsersLayout";
import GuestLayout from "../layouts/GuestLayout";


import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";

import User from "../views/users/User";
import UserForm from "../views/users/UserForm";


import Portfolio from "../views/guest/Portfolio";
import PostForm from "../views/guest/PostForm";
import Comments from "../views/guest/Comments";
import Home from "../views/guest/Home";



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
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/portfolio/:id" />,
      },
      {
        path: "/portfolio/:id",
        element: <Portfolio />,
      },
      {
        path: "/posts/create",
        element: <PostForm key="postCreate" />,
      },
      {
        path: "/posts/update/:id",
        element: <PostForm key="postUpdate" />,
      },
      {
        path: "/posts/comments/:id",
        element: <Comments />,
      },
      {
        path: "/home",
        element: <Home />,
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
