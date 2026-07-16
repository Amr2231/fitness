import { createBrowserRouter, Navigate } from "react-router-dom";
import About from "./app/about/page";
import Register from "./app/auth/register/page";
import Home from "./app/home/page";
import AuthLayout from "./layouts/auth-layout";
import LocaleLayout from "./layouts/local-layout";
import RootLayout from "./layouts/root-layout";
import NotFound from "./app/not-found/page";
import ForgotPassword from "./app/auth/forgot-password/page";
import Healthy from "./app/healthy/components/page";
import Classes from "./app/classes/page";
import Account from "./app/account/page";
import AccountLayout from "./layouts/account-layout";
import Meal from "./app/healthy/meals/[mealId]/page";
import MuscleExercisesPage from "./app/classes/exercises/page";
import Login from "./app/auth/login/page";

export const router = createBrowserRouter([
  {
    path: "/:locale",
    element: <LocaleLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
          { path: "classes", element: <Classes /> },
          { path: "classes/:muscleGroupId", element: <Classes /> },
          {
            path: "classes/:muscleGroupId/muscles/:primeMoverMuscleId",
            element: <MuscleExercisesPage />,
          },
          {
            path: "healthy",
            children: [
              { index: true, element: <Healthy /> },
              { path: "meals/:mealId", element: <Meal /> },
            ],
          },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },
      {
        element: <AccountLayout />,
        children: [{ path: "account", element: <Account /> }],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
]);
