import React, { useState } from 'react'
import Input from './items/input'
import Button from './items/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { setRefresh } from '@/redux/reducer/RefreshReducer'
import store from '@/redux/store'
const Login = () => {
    const toPage = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (body: { username: string, password: string }) => {
        const result = await axios.post(process.env.server_url + "login", body)
        if (result.data.success) {
            localStorage.token = "Bearer " + result.data.data.token
            setUsername("")
            setPassword("")
            toPage.refresh()
            store.dispatch(setRefresh())
        } else {
            alert(result.data.message)
        }
    }
    return (
        <div className='login center'>
            <h3>Login</h3>
            <Input name='username' value={username} onChange={(data) => setUsername(data)} />
            <Input type='password' name='password' value={password} onChange={(data) => setPassword(data)} />
            <Button onClick={() => login({ username, password })} name="Log in" />
        </div>
    )
}

export default Login