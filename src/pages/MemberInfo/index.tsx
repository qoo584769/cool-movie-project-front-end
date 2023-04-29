import React from "react";
import { MemberContainer } from "../../components/MemberContainer";

export const MemberInfo: React.FC = () => {
  return (
    <>
      <MemberContainer title="個人檔案">
        <div className="memberInfo">
          <form className="memberInfo-form d-flex flex-column">
            <div className="mb-2">
              <p className="mb-2">照片</p>
              <div
                className="memberInfo-avatar rounded-circle mb-1"
                style={{
                  backgroundImage: `url(/images/member/default_avatar.svg)`,
                }}
              >
                <div className="memberInfo-avatar-edit" 
                  style={{
                    backgroundImage: `url(/images/member/camera.svg)`,
                  }}
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="name" className="mb-2">
                暱稱
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入暱稱"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="birthday" className="mb-2">
                生日
              </label>
              <input
                id="birthday"
                name="birthday"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入生日"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone" className="mb-2">
                電話
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入電話"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="mb-2">
                email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入信箱"
              />
            </div>
            <input
              type="submit"
              className="button align-self-end"
              value="儲存"
            />
          </form>
        </div>
      </MemberContainer>
    </>
  );
};
