import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import UsersLayout from "../layouts/UsersLayout";


import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";

import User from "../views/users/User";
import UserForm from "../views/users/UserForm";
import UserShow from "../views/users/UserShow";
import SectionLayout from "../layouts/SectionLayout";
import Section from "../views/sections/Section";
import SectionForm from "../views/sections/SectionForm";
import SectionShow from "../views/sections/SectionShow";
import GuestLayout from "../layouts/GuestLayout";
import Portfolio from "../views/guest/Portfolio";
import PostForm from "../views/guest/PostForm";
import Comments from "../views/guest/Comments";
import Profile from "../views/guest/Profile";
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
      {
        path: "/users/:id",
        element: <UserShow />,
      },
    ],
  },
  {
    path: "/",
    element: <SectionLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/sections" />,
      },

      {
        path: "/sections/create",
        element: <SectionForm key="sectionCreate" />,
      },
      {
        path: "/sections/update/:id",
        element: <SectionForm key="sectionUpdate" />,
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
        path: "/sections",
        element: <Section />,
      },
      {
        path: "/sections/:id",
        element: <SectionShow />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
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
