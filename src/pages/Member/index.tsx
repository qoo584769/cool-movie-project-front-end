import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { getMember } from "../../api/member";
import { format } from "date-fns";
import { Loading } from "../../components";
import { I_MEMBER } from "../../interface/member";

export const Member: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [member, setMember] = useState<I_MEMBER>({
    birthday: "",
    email: "",
    nickName: "",
    phoneNumber: "",
    profilePic: "",
  });
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data: response } = await getMember();
        console.log(response);
        
        if (response.status) {
          const { data: memberInfo } = response;
          const { birthday, email, nickName, phoneNumber, profilePic } =
            memberInfo;
          setMember({
            birthday: birthday
              ? format(new Date(birthday), "yyyy-MM-dd")
              : "無資料",
            email: email || "無資料",
            nickName: nickName || "無資料",
            phoneNumber: phoneNumber || "無資料",
            profilePic: profilePic || "/images/member/default_avatar.svg",
          });
          return;
        }
        alert(response.message);
      } catch (error) {
        alert("系統錯誤請聯絡管理員");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Loading isActive={isLoading}></Loading>
      <div className="member py-5 p-md-5">
        <div className="container  d-flex">
          <div className="member-sidebar me-4 d-none d-lg-block">
            <div className="member-sidebar-user  p-3 pt-5 mb-4 d-flex flex-column">
              <div
                className="member-sidebar-user-avatar align-self-center rounded-circle overflow-hidden mb-1"
                style={{
                  backgroundImage: `url(${member.profilePic})`,
                }}
              ></div>
              <div className="member-sidebar-user-nickname text-center">
                jason
              </div>
              <hr className="my-2" />
              <div className="member-sidebar-user-name">
                <p className="text-muted">會員</p>
                <p>{member.nickName}</p>
              </div>
              <hr className="my-2" />
              <div className="member-sidebar-user-email">
                <p className="text-muted">E-mail</p>
                <p className="mb-1x">{member.email}</p>
              </div>
            </div>
            <ul className="member-sidebar-nav py-5 ps-0">
              <li>
                <NavLink
                  end
                  to={`/member`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  個人檔案
                </NavLink>
              </li>
              <li>
                <NavLink to={`/member/account`}>帳號設定</NavLink>
              </li>
              <li>
                <NavLink to={`/member/order`}>訂票紀錄</NavLink>
              </li>
              <li>
                <NavLink to={`/member/bonus`}>紅利查詢</NavLink>
              </li>
            </ul>
          </div>
          <Outlet context={{ member, setMember }}></Outlet>
        </div>
      </div>
    </>
  );
};
