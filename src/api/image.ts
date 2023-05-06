import { authFetch } from '../utilities/authFetch'
export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return await authFetch.post(`/api/upload/image`, formData);
  }