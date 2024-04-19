import React, { useRef } from 'react'
import Box from '../grid/box';
type Props = {
    icon: React.ReactNode | string;
    size?: number
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ icon, size, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <Box className={`upload_button`} style={{ borderRadius: "5px", background: "#0073e6", color: "white", cursor: "pointer" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <Box onClick={() => IconRef.current && IconRef.current.click()} style={{ padding: "5px", width: size + "px", height: size + "px" }}>{icon}</Box>
        </Box>
    )
}

export default UploadButton