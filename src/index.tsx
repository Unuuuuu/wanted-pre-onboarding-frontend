import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/home";
import Signup, { loader as signupLoader } from "./routes/signup";
import Signin, { loader as signinLoader } from "./routes/signin";
import Todo, { loader as todoLoader } from "./routes/todo";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AccessTokenProvider from "./context";

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
      {
        path: "/todo",
        element: <Todo />,
        loader: todoLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AccessTokenProvider>
      <RouterProvider router={router} />
    </AccessTokenProvider>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
  </React.StrictMode>
);
