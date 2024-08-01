import ConfigPage from '@renderer/pages/ConfigPage';
import Home from '@renderer/pages/Home';
import QrPage from '@renderer/pages/QrPage';
import APP from '../APP';
import {
  createHashRouter
} from "react-router-dom";
import ErrorPage from "../pages/error-page";

export const router = createHashRouter([
  {
    path: "/",
    element: <APP />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/configPage",
        element: <ConfigPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/qrPage",
        element: <QrPage />,
        errorElement: <ErrorPage />,
      }
    ]
  },

]);