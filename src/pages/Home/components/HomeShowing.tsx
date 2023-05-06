import React from "react";

interface HomeShowing {
  isShowing: boolean;
  children?: React.ReactNode;
}

export const HomeShowing: React.FC<HomeShowing> = ({ children, isShowing }) => {
  return (
    <div className="homeShowing">
      {isShowing ? (
        <h2 className="homeShowing-title">
          熱映中
          <span className="ms-4">NOW SHOWING</span>
        </h2>
      ) : (
        <h2 className="homeShowing-title">
          即將上映
          <span className="ms-4">COMING SOON</span>
        </h2>
      )}
      <hr />
      {children}
    </div>
  );
};
