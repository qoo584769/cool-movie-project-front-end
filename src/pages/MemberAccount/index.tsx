import React, { useState } from "react";
import { MemberContainer } from "../../components/MemberContainer";
import { useForm } from "react-hook-form";
import { I_ChangePassword } from "../../interface/member"
import { changePassword } from "../../api/member";
import { Loading } from "../../components";

export const MemberAccount: React.FC = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 表單資料
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<I_ChangePassword>();

  const onSubmit = async (formData: I_ChangePassword) => {
    setIsSubmitting(true);    
    try {
      const { data: response } = await changePassword({
        ...formData,
      });
      if (response.status) {
        alert('修改密碼成功')
        return;
      }
      alert(response.message);
    } catch (error) {      
      alert("系統錯誤請聯絡管理員");
    } finally {
      reset()
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Loading isActive={isSubmitting}></Loading>
      <MemberContainer title="帳號設定">
        <div className="MemberAccount">
          <form className="MemberAccount-form d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label htmlFor="password" className="mb-2">
                新密碼
              </label>
              <input
                id="password"
                type="password"
                className="input mb-2"
                autoComplete="off"
                placeholder="新密碼" 
                {...register("password", { required: "請輸入密碼" })}
              />
              {errors.password && (
                <span className="member-form-error">
                  {errors.password.message}
                </span>
              )}
              <input
                id="passwordCheck"
                type="password"
                className="input"
                autoComplete="off"
                placeholder="再次確認密碼"
                {...register("confirmPassword", { required: "再次確認新密碼" })}
              />
              {errors.confirmPassword && (
                <span className="member-form-error">
                  {errors.confirmPassword.message}
                </span>
              )}
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