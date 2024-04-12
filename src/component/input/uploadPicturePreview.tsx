import React, { useRef, useState } from 'react'
import Image from 'next/image';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LoopIcon from '@mui/icons-material/Loop';
type Props = {
    icon: React.ReactNode | string;
    src?: any,
    size?: number,
    func?: () => void,
    loading?: boolean,
}

const UploadPicturePreview = ({ size, src, icon, func, loading }: Props) => {

    return (
        <div className="picturePreview">
            {
                src ?
                    <Image src={src} alt='pic' fill style={{ objectFit: 'cover', opacity: "1" }} /> :
                    <div className='imageface center'><InsertPhotoOutlinedIcon /></div>
            }
            <div className={`upload_button`} style={{ width: size + "px", height: size + "px" }}>
                <div onClick={() => func && func()}>{loading ? <LoopIcon /> : icon}</div>
            </div>
        </div>
    )
}

export default UploadPicturePreview