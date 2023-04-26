import React, { useState,useEffect } from 'react'
import { useParams ,useNavigate } from 'react-router-dom';
import axios from "axios"

const api = 'https://api.unsplash.com/photos';
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS

interface MovieInfoProps {

}

interface PhotoInfoType {
    description:string
    urls:{
        regular:string,
        small:string,
    }
    
}

export const Movie: React.FC<MovieInfoProps> = ({}) => {
    console.log('useParams()',useParams())
    const {id} =useParams()
    const [photo,setPhoto] = useState<PhotoInfoType | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        (async function(){
        try {
            let response = await axios.get(`${api}/${id}?client_id=${accessKey}`)
            setPhoto(response.data)
        } catch(error){
            console.log('error',error);
        }
        }())
    }, [id])

    return (
        <div>
            <p>圖片id: {id}</p>
            <img src={photo?.urls?.small} alt="" />
        </div>
    );
}