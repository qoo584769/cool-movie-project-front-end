import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { MemberContainer } from "../../components/MemberContainer";
import { useOutletContext } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../../components";
import { updateMember } from "../../api/member";
import { format } from "date-fns";
import { OrderContext } from "../../store";
import { uploadImage } from "../../api/image";
import { validateFile } from "../../utilities/validate";
import { I_MEMBER, I_FormData } from "../../interface/member";

export const MemberInfo: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_, dispatch] = useContext(OrderContext);
  // 表單資料
  const { member, setMember } = useOutletContext<{
    member: I_MEMBER;
    setMember: Dispatch<SetStateAction<I_MEMBER>>;
  }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<I_FormData>();

  useEffect(() => {
    reset(member);
  }, [member]);

  const onSubmit = async (formData: I_FormData) => {
    setIsSubmitting(true);
    try {
      const { data: response } = await updateMember({
        ...formData,
        profilePic: avatar,
      });
      if (response.status) {
        const newFormData = response.data;
        setMember((member) => {
          return {
            ...member,
            birthday:
              format(new Date(newFormData.birthday), "yyyy-MM-dd") || "無資料",
            email: newFormData.email || "無資料",
            nickName: newFormData.nickName || "無資料",
            phoneNumber: newFormData.phoneNumber || "無資料",
            profilePic: avatar || "/images/member/default_avatar.svg",
          };
        });
        dispatch({
          type: "ADD_MEMBER_DATA",
          payload: {
            memberName: newFormData.nickName,
          },
        });
        return;
      }
      alert(response.message);
    } catch (error) {
      alert("系統錯誤請聯絡管理員");
    } finally{
      setIsSubmitting(false);
    }
  };
  // 表單資料

  // 圖片上傳
  const [avatar, setAvatar] = useState("/images/member/default_avatar.svg"); // 預設圖片
  useEffect(() => {
    setAvatar(member.profilePic);
  }, [member]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsSubmitting(true);
      const file = e.target.files?.[0];
      if (file) {
        const error = validateFile(
          file,
          ["image/jpeg", "image/png"],
          2 * 1024 * 1024
        );
        if (error) {
          alert(error);
          return;
        }
        const { data: response } = await uploadImage(file);
        if (response.status) {
          setAvatar(response.data.fileUrl);
          return;
        }
        alert(response.message);
      }
    } catch (error) {
      alert("系統錯誤請聯絡管理員");
    } finally {
      setIsSubmitting(false);
    }
  };
  // 圖片上傳

  return (
    <>
      <Loading isActive={isSubmitting}></Loading>
      <MemberContainer title="個人檔案">
        <div className="memberInfo">
          <form
            className="memberInfo-form d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-2">
              <p className="mb-2">照片</p>
              <label
                className="memberInfo-avatar-label d-inline-block"
                htmlFor="avatar"
              >
                <div
                  className="memberInfo-avatar rounded-circle mb-1"
                  style={{ backgroundImage: `url(${avatar})` }}
                >
                  <div className="memberInfo-avatar-edit d-flex justify-content-center align-items-center">
                    <img
                      src="/images/member/camera.svg"
                      alt="上傳照片"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="name" className="mb-2">
                暱稱
              </label>
              <input
                id="name"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入暱稱"
                {...register("nickName", { required: "請輸入暱稱" })}
              />
              {errors.nickName && (
                <span className="member-form-error">
                  {errors.nickName.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="birthday" className="mb-2">
                生日
              </label>
              <input
                id="birthday"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入生日"
                {...register("birthday", {
                  required: false,
                  pattern: {
                    value:
                      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                    message: "請輸入正確的日期格式（yyyy-mm-dd）",
                  },
                })}
              />
              {errors.birthday && (
                <span className="member-form-error">
                  {errors.birthday.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="phone" className="mb-2">
                電話
              </label>
              <input
                id="phone"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入電話"
                {...register("phoneNumber", { required: false })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="mb-2">
                email
              </label>
              <input
                id="email"
                type="text"
                className="input"
                autoComplete="off"
                placeholder="請輸入信箱"
                {...register("email", {
                  required: "請輸入信箱",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "請輸入正確的信箱格式",
                  },
                })}
              />
              {errors.email && (
                <span className="member-form-error">
                  {errors.email.message}
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
