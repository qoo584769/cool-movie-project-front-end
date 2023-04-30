import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Home, 
  Member,
  Movie, 
  Seats, 
  Ticknumber,MemberInfo,
  MemberAccount,
  MemberBonus,
  MemberOrder
} from "./pages"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/member",
    element: <Member/>,
    children: [
      {
        path: "",
        element:<MemberInfo/>,
      },
      {
        path: "account",
        element:<MemberAccount/>,
      },
      {
        path: "bonus",
        element:<MemberBonus/>,
      },
      {
        path: "order",
        element:<MemberOrder/>,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ]
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
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;