import React, { useRef } from 'react'
type Props = {
    icon: React.ReactNode | string;
    size?: number,
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ size, icon, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={`upload_button`} style={{ width: size + "px", height: size + "px" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()} style={{ width: "max-content", margin: "auto" }}>{icon}</div>
        </div>
    )
}

export default UploadButton