'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Input from '../input/input'
import Button from '../input/button'
import Link from 'next/link'
import axios from 'axios'
import Box from '../grid/box'
type Props = {
    archive: string
}
const Signup = ({ archive }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const toPage = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})

    useEffect(() => {
        validateForm && validateForm();
    }, [username, password, email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (username.length != 0 && 6 > username.length) {
            errors.username = `username's lenght is smallest 6 `
        }
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            errors.email = 'email is not valid';
        }
        if (password.length != 0 && password.length < 6) {
            errors.password = `password's lenght is smallest 6`;
        }

        setIsErrors(Object.keys(errors).length || username === "" || password === "" || email === "" ? true : false);
        setErrors(errors)
    }
    const signup = async (body: { username: string, password: string, email: string }) => {
        const result = await axios.post(process.env.server_url + "signup", body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(result)

        if (result.data.success) {
            setUsername("")
            setPassword("")
            setEmail("")
            alert(result.data.msg)
            toPage.push("/" + archive + "/login")
        } else {
            alert(result.data.msg)
        }
    }

    return (
        <Box className={` ${currentTheme ? "background_light" : "background_dark"} boxShadow center textAlignCenter`}
            style={{ width: "90%", padding: "50px 0", maxWidth: "375px", margin: "auto", borderRadius: "5px" }}>
            <h3>Sign Up</h3>
            <Input name='username' value={username} onChange={(data) => setUsername(data)} />
            <p style={{ fontSize: "0.6rem", color: "red" }}>{Error.username}</p>
            <Input type='password' name='password' value={password} onChange={(data) => setPassword(data)} />
            <p style={{ fontSize: "0.6rem", color: "red" }}>{Error.password}</p>
            <Input name='email' value={email} onChange={(data) => setEmail(data)} />
            <p style={{ fontSize: "0.6rem", color: "red" }}>{Error.email}</p>
            <Button onClick={() => signup({ username, password, email })} name="Sign up" disable={isError} />
            <p className='link' onClick={() => toPage.push("/" + archive + "/login")}>log in</p>
        </Box>
    )
}

export default Signup