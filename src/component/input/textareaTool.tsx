import React, { useEffect, useRef, useState } from 'react'
import store from '@/redux/store'
import PictureModal from '../modal/pictureModal'
type Props = {
    onChange: (e: string) => void,
    name: string,
    value: string,
}

const TextAreaTool = ({ onChange, name, value }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const inputRef = useRef<HTMLDivElement | null>(null)

    const [focus, setFocus] = useState<boolean>(false)
    const [img, setImg] = useState<boolean>(false)
    const [imglink, setImgLink] = useState<string>("")

    const createText = (value: string) => {
        inputRef.current ? inputRef.current.innerHTML += `<${value}>hello world</${value}>` : null
        inputRef.current ? onChange(inputRef.current.innerHTML) : null

    }
    const createImage = (type: string, value: string) => {
        inputRef.current ? inputRef.current.innerHTML += `<${type} src=${value}></${type}>` : null
        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setImg(false)
        setImgLink("")
    }

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = value : null
    }, [])


    return (
        <div className={`textareaTool ${focus || inputRef.current?.innerHTML || value ? "textarea_focus" : ""}`}>

            <p className={`name ${focus || inputRef.current?.innerHTML || value ? "name_focus" : ""}`} >{name}</p>
            <div className={`tool`}>
                <p className='border' onClick={() => createText("h1")}>h1</p>
                <p onClick={() => createText("h2")}>h2</p>
                <p onClick={() => createText("h3")}>h3</p>
                <p onClick={() => createText("h4")}>h4</p>
                {img ?
                    <><input placeholder='link' onChange={(e) => setImgLink(e.target.value)}></input><p onClick={() => createImage("img", imglink)}>ok</p></>
                    : <p onClick={() => setImg(true)}>add image url</p>}
            </div>
            <div ref={inputRef} className="input_box scrollNone" contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            >
            </div>
        </div >
    )
}

export default TextAreaTool