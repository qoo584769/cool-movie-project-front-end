import type { RouteObject } from "react-router-dom";
import { Home, Member, Movie, Seats, Ticknumber } from "./pages"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/member/:id",
    element: <Member />,
    children: []
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
  {
    path: "/ticknumber",
    element: <Ticknumber />,
  },
  {
    path: "/chooseSeates/:tickNumber",
    element: <Seats />,
  },
];

export default routes;