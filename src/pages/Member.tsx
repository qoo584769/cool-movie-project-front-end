import React from 'react'
import { useParams } from 'react-router-dom';

interface MemberProps {

}

export const Member: React.FC<MemberProps> = ({}) => {
    const memberId = useParams().id
    // console.log('useParams()',useParams())
    return (
        <>
            我是編號{memberId}會員
        </>
    );
}