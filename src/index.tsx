import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/home";
import Signup, { loader as signupLoader } from "./routes/signup";
import Signin, { loader as signinLoader } from "./routes/signin";
import { Toaster } from "react-hot-toast";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
        loader: signupLoader,
      },
      {
        path: "/signin",
        element: <Signin />,
        loader: signinLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
