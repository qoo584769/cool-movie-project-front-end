export const validateFile = (file: File, allowedTypes: string[], maxSize: number): string | null => {
    const fileType = file.type;
    const fileSize = file.size;

    if (!allowedTypes.includes(fileType)) {
        return `不支援的檔案格式，請選擇 ${allowedTypes.join(", ")} 格式的檔案。`;
    }

    if (fileSize > maxSize) {
        const sizeInMB = maxSize / (2 * 1024 * 1024);
        return `檔案大小不能超過 ${sizeInMB}MB。`;
    }

    return null;
};