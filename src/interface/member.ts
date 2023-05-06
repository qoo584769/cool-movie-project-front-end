export interface I_MEMBER {
    birthday: string;
    email?: string;
    nickName: string;
    phoneNumber: string;
    profilePic: string;
}

export interface I_FormData {
    nickName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    profilePic: string;
}

export interface CatchErrorMessage {
    code: string,
    message: string,
    response: {
        status: number
        data: {
            message: string
        }
    };
}