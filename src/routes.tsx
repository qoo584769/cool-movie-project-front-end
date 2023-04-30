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
    path: "/member/*",
    element: <Member/>,
    children: [
      {
        path: "",
        element: <Navigate to="/" />,
      },
      {
        path: ":id",
        element:<MemberInfo/>,
      },
      {
        path: ":id/account",
        element:<MemberAccount/>,
      },
      {
        path: ":id/bonus",
        element:<MemberBonus/>,
      },
      {
        path: ":id/order",
        element:<MemberOrder/>,
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
];

export default routes;