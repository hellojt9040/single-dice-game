import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../../components/Home";
import Layout from "../../components/Layout";
import GameBoard from "../../containers/GameBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/gameBoard", element: <GameBoard /> }
    ]
  }
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
