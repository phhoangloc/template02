'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import Box from '@/component/grid/box'
type Props = {
    children: React.ReactNode
}

const ArchiveMain = ({ children }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    return (
        currentUser._id ?
            <Box className={`archive ${currentMenu ? "archiveOpen" : ""}`}>
                {children}
            </Box> :
            <Box className={`archive textAlignCenter ${currentMenu ? "archiveOpen" : ""}`}>
                <h3>you have not login yet </h3>
            </Box>
    )
}

export default ArchiveMain