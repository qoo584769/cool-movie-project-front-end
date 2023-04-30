import React from "react";
import { MemberContainer } from "../../components/MemberContainer";

export const MemberAccount: React.FC = () => {
  return (
    <>
      <MemberContainer title="帳號設定">
        <div className="MemberAccount">
          <form className="MemberAccount-form d-flex flex-column">
            <div className="mb-2">
              <label htmlFor="password" className="mb-2">
                新密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input mb-2"
                autoComplete="off"
                placeholder="新密碼"
              />
              <input
                id="passwordCheck"
                name="passwordCheck"
                type="password"
                className="input"
                autoComplete="off"
                placeholder="再次確認密碼"
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
