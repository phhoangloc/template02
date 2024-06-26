import React, { useRef, useState } from 'react'
import Image from 'next/image';
import LoopIcon from '@mui/icons-material/Loop';
import Box from '../grid/box';
type Props = {
    icon: React.ReactNode | string;
    src: any,
    size?: number,
    func?: () => void,
    loading?: boolean,
    imgstyle?: React.CSSProperties
    iconStyle?: React.CSSProperties
}

const UploadPicturePreview = ({ size, src, icon, func, loading, imgstyle, iconStyle }: Props) => {

    return (
        <Box style={{ height: "100%" }}>
            <Box style={{ height: "100%" }}>
                <Image src={src} alt='pic' width={500} height={500} style={imgstyle || { width: "auto", height: "100%", opacity: "1" }} />
            </Box>
            <Box onClick={() => func && func()}
                style={iconStyle || { width: size + "px", height: size + "px", zIndex: 1, color: "black", background: "white", position: "absolute", bottom: "5px", right: "5px", borderRadius: "5px" }}>
                {loading ? <LoopIcon /> : icon}
            </Box>
        </Box>
    )
}

export default UploadPicturePreview