'use client'
import React, { useEffect, useState } from 'react'
import Input from '../input/input'
import store from '@/redux/store'
import Button from '../input/button'
import { useRouter } from 'next/navigation'
import { NoUserAuthen } from '@/axios/NoUserAuthen'
import { setNotice } from '@/redux/reducer/noticeReducer'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import Box from '../grid/box'

type Props = {
    archive: string
}
const Login = ({ archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (data: { username: string, password: string }) => {
        const result = await NoUserAuthen.login(data)
        if (result.success) {
            // store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            // setTimeout(() => {
            //     store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            // }, 3000)
            localStorage.token = "bearer " + result.data.token
            store.dispatch(setRefresh())
            toPage.push("/" + archive)
        } else {
            // store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            // setTimeout(() => {
            //     store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            // }, 3000)
        }
    }
    return (
        <Box className={` ${currentTheme ? "background_light" : "background_dark"} boxShadow center textAlignCenter`}
            style={{ width: "90%", padding: "50px 0", maxWidth: "375px", margin: "auto", borderRadius: "5px" }}>
            <h2>Log In</h2>
            <Input name="username" value={username} onChange={(e => setUsername(e))} />
            <Input name="password" type='password' value={password} onChange={(e => setPassword(e))} />
            <Button name="Log In" onClick={() => login({ username, password })} />
            <p className="link" onClick={() => toPage.push("signup")}>sign up</p>
        </Box>
    )
}

export default Login