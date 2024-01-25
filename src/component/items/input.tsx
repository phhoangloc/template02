import React, { useRef, useState } from 'react'
import "./style.css"
type Props = {
    onChange: (e: string) => void,
    name: string,
    value: string,
    type?: string
}

const input = ({ onChange, name, value, type }: Props) => {
    const [focus, setFocus] = useState<boolean>(false)
    return (
        <div className={`input ${focus || value ? "input_focus" : ""}`}>
            <p className={`name ${focus || value ? "name_focus" : ""}`} >{name}</p>
            <input className="input_box" contentEditable={true}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                type={type}
            ></input>
        </div >
    )
}

export default input