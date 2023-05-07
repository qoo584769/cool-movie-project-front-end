import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface HamburgerMenuProps {
  isLogin: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isLogin,
  isOpen,
  setIsOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigateHandler = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <>
      <div
        className="hamburger-menu"
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="hamburger-menu-logo">
            <img src="/images/Logo.svg" />
          </div>
          <div
            className="hamburger-menu-close"
            role="button"
            onClick={() => setIsOpen(false)}
          >
            <img src="/images/close-icon.png" />
          </div>
        </div>
        <ul className="hamburger-menu-link">
          <li>
            <p
              className={location.pathname.match("/benifet") ? "active" : ""}
              onClick={() => navigateHandler("/benifet")}
              role="button"
            >
              好康優惠
            </p>
          </li>
          <li>
            <p
              className={location.pathname.match("/aboutus") ? "active" : ""}
              onClick={() => navigateHandler("/aboutus")}
              role="button"
            >
              關於影城
            </p>
          </li>
          {isLogin && (
            <>
              <li>
                <p
                  className={location.pathname === "/member" ? "active" : ""}
                  onClick={() => navigateHandler("/member")}
                  role="button"
                >
                  個人檔案
                </p>
              </li>
              <li>
                <p
                  className={
                    location.pathname.match("/member/account") ? "active" : ""
                  }
                  onClick={() => navigateHandler("/member/account")}
                  role="button"
                >
                  帳號設定
                </p>
              </li>
              <li>
                <p
                  className={
                    location.pathname.match("/member/order") ? "active" : ""
                  }
                  onClick={() => navigateHandler("/member/order")}
                  role="button"
                >
                  訂票紀錄
                </p>
              </li>
              <li>
                <p
                  className={
                    location.pathname.match("/member/bonus") ? "active" : ""
                  }
                  onClick={() => navigateHandler("/member/bonus")}
                  role="button"
                >
                  紅利查詢
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
