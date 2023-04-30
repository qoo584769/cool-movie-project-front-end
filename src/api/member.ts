import { authFetch } from '../utilities/authFetch'

interface I_Member {
    nickName: string;
    phoneNumber: string;
    birthday: string;
    profilePic: string;
}

export const getMember = async () => {
    return await authFetch.get(`/api/member/getUser`);
}

export const updateMember = async ({
    nickName,
    phoneNumber,
    birthday,
    profilePic
}: I_Member) => {
    return await authFetch.post(`/api/member/updateUser`, {
        nickName,
        phoneNumber,
        birthday,
        profilePic
    });
}

