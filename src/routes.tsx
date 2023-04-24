import type { RouteObject } from "react-router-dom";
import {Home, Member, Movie, Ticknumber} from "./pages"

const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/member/:id",
      element: <Member />,
    },
    {
      path: "/movie/:id",
      element: <Movie />,
    },
    {
      path: "/ticknumber",
      element: <Ticknumber />,
    },
  ];

  export default routes;