import { authFetch } from '../utilities/authFetch'
import { I_MEMBER, I_ChangePassword} from '../interface/member'

export const getMember = async () => {
    return await authFetch.get(`/api/member/getUser`);
}

export const updateMember = async ({
    nickName,
    phoneNumber,
    birthday,
    profilePic
}: I_MEMBER) => {
    return await authFetch.post(`/api/member/updateUser`, {
        nickName,
        phoneNumber,
        birthday,
        profilePic
    });
}

export const changePassword = async ({
    password,
    confirmPassword
}: I_ChangePassword) => {
    return await authFetch.post(`/api/member/changePassword`, {
        password,
        confirmPassword
    });
}