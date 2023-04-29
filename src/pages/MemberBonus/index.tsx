import React from "react";
import { MemberContainer } from "../../components/MemberContainer";

export const MemberBonus: React.FC = () => {
  return (
    <>
      <MemberContainer title="會員紅利">
        <div className="memberBonus">
            <div className="memberBonus-total mb-2 d-flex align-center">
                我得紅利點數：<img src="/images/member/icon_bonus_pink.svg" className="me-2"/> 0 
            </div>
            <div className="memberBonus-list">
              <p className="mb-2">會員紅利紀錄</p>
              暫無紀錄
            </div>
        </div>
      </MemberContainer>
    </>
  );
};
