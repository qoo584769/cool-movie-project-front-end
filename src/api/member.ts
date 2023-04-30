import { authFetch } from '../utilities/authFetch'
import { I_MEMBER} from '../interface/member'

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

