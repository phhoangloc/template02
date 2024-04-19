'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { UserAuthen } from '@/axios/UserAuthen'
import { setUser } from '../reducer/UserReduce'
import Loading from '@/app/loading'
import Box from '@/component/grid/box'
import PlayerModal from '@/component/modal/playerModal'
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
    }

    update()

    const [loading, setLoading] = useState<boolean>(true)

    const checkLogin = async () => {
        setLoading(true)
        const result = await UserAuthen.checkLogin()

        if (result.success) {
            store.dispatch(setUser(result.data))
            setLoading(false)
        } else {
            store.dispatch(setUser({}))
            setLoading(false)
        }
    }

    useEffect(() => {
        checkLogin()
    }, [currentRefresh])


    return (
        <Box className={`provider ${currentTheme ? "light" : "dark"}`}>
            <PlayerModal src="https://locpham.blog/file/abide_by.wav" />
            {loading ? <Loading /> : children}
        </Box>

    )
}

export default Provider