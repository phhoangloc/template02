import React, { useRef, useState } from 'react'
import "./style.css"
type Props = {
    onChange: (e: string) => void,
    name: string,
    value: string
}

const Input = ({ onChange, name, value }: Props) => {
    const inputRef = useRef<HTMLDivElement | null>(null)

    const [focus, setFocus] = useState<boolean>(false)

    if (value === "") {
        inputRef.current ? inputRef.current.innerHTML = "" : null
    }
    return (
        <div className={`inputA ${focus || inputRef.current?.innerHTML ? "inputA_focus" : ""}`}>
            <p className={`name ${focus || inputRef.current?.innerHTML ? "name_focus" : ""}`} >{name}</p>
            <div ref={inputRef} className="input_box" contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            >
            </div>
        </div >
    )
}

export default Input