import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export const Member: React.FC = () => {
  return (
    <div className="member py-5 p-md-5">
      <div className="container  d-flex">
        <div className="member-sidebar me-4 d-none d-lg-block">
          <div className="member-sidebar-user  p-3 pt-5 mb-4 d-flex flex-column">
            <div
              className="member-sidebar-user-avatar align-self-center rounded-circle overflow-hidden mb-1"
              style={{
                backgroundImage: `url(/images/member/default_avatar.svg)`,
              }}
            ></div>
            <div className="member-sidebar-user-nickname text-center">
              jason
            </div>
            <hr className="my-2" />
            <div className="member-sidebar-user-name">
              <p className="text-muted">會員</p>
              <p>nickname</p>
            </div>
            <hr className="my-2" />
            <div className="member-sidebar-user-email">
              <p className="text-muted">E-mail</p>
              <p className="mb-1x">z27089433@gmail.com</p>
            </div>
          </div>
          <ul className="member-sidebar-nav py-5 ps-0">
            <li>
              <NavLink
                end
                to={`/member/1`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                個人檔案
              </NavLink>
            </li>
            <li>
              <NavLink to={`/member/1/account`}>帳號設定</NavLink>
            </li>
            <li>
              <NavLink to={`/member/1/order`}>訂票紀錄</NavLink>
            </li>
            <li>
              <NavLink to={`/member/1/bonus`}>紅利查詢</NavLink>
            </li>
          </ul>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
