'use client'
import React, { useEffect, useRef, useState } from 'react'
import { BoxDangerousType } from '@/type/divType'
import Box from './box'
import store from '@/redux/store'
const BoxDangerous = ({ detail, style }: BoxDangerousType) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [overBox, setOverBox] = useState<boolean>(false)
    const dangerousBoxRef: any = useRef()
    useEffect(() => {

        if (dangerousBoxRef.current?.scrollHeight > dangerousBoxRef.current?.clientHeight) {
            setOverBox(true)
        } else {
            setOverBox(false)
        }
    })

    return (
        detail &&
        <Box style={{ position: "relative" }}>
            <div ref={dangerousBoxRef} className='dangerousBox' dangerouslySetInnerHTML={{ __html: detail }} style={style} />
            <div className={`ellipsis ${currentTheme ? "background_light" : "background_dark"}`}
                style={{ display: overBox ? "block" : "none", position: "absolute", bottom: 0, left: 0, width: "100%" }}>...</div>
        </Box>
    )
}

export default BoxDangerous