import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Home,
  Member,
  MovieDetail,
  Seats,
  Ticknumber, MemberInfo,
  MemberAccount,
  MemberBonus,
  MemberOrder,
  Benifet,
  AboutUs,
  Order,
  NewebPay
} from "./pages"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/member",
    element: <Member />,
    children: [
      {
        path: "",
        element: <MemberInfo />,
      },
      {
        path: "account",
        element: <MemberAccount />,
      },
      {
        path: "bonus",
        element: <MemberBonus />,
      },
      {
        path: "order",
        element: <MemberOrder />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ]
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "/ticknumber/:id",
    element: <Ticknumber />,
  },
  {
    path: "/benifet",
    element: <Benifet />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/chooseSeates/:id/:tickNumber",
    element: <Seats />,
  },
  {
    path: "/order/:id",
    element: <Order />,
  },
  {
    path: "/newebpayreturn",
    element: <NewebPay />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;