'use client'
import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '@/provider/socketProvider';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import store from '@/redux/store';
import { setTheme } from '@/redux/reducer/ThemeReducer';
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReducer';
import Image from 'next/image';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import SmsIcon from '@mui/icons-material/Sms';
import { setRefresh } from '@/redux/reducer/RefreshReducer';
const Header = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [number, setNumber] = useState<number>(0)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const avata = currentUser && currentUser.infor && currentUser.infor.avata

    const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false)
    const toPage = useRouter()

    const toProfile = () => {
        toPage.push("/home/profile")
    }
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const login = () => {
        toPage.push("/login")
    }
    const singup = () => {
        toPage.push("/signup")
    }

    const socket = useContext<any>(SocketContext);

    useEffect(() => {
        socket?.on("signal", (data: any) => setNumber((prev) => prev + 1))
    }, [socket])

    const [notificaionCount, setNotificationCount] = useState<number>(0)

    const getNoti = async () => {
        const result = await axios.get(process.env.server_url + "noti?seen=false&&type=msg", {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        })
        if (result.data.success) {
            setNotificationCount(result.data.data.length)
        }
    }

    useEffect(() => {
        getNoti()
    }, [number])
    return (
        <div className='header'>
            {currentTheme ?
                <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} /> :
                <LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
            {currentMenu ?
                <CloseIcon onClick={() => store.dispatch(setMenu(false))} /> :
                <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
            <ShoppingCartIcon />
            <div className='icon'>
                {currentUser._id && <SmsIcon onClick={() => { toPage.push("/home/message") }} />}
                {notificaionCount ? <p className='noti'>{notificaionCount}</p> : null}
            </div>
            <div className="accountIcon">
                {avata ? <Image width={100} height={100} src={process.env.google_url + avata} alt="avata" onClick={() => setAccountModalOpen(!accountModalOpen)} /> : <PersonIcon onClick={() => setAccountModalOpen(!accountModalOpen)} />}

                {currentUser._id ?
                    <div className={`accountModal ${accountModalOpen ? "accountModalOpen" : ""} ${currentTheme ? "light" : "dark"}`} onMouseLeave={() => setAccountModalOpen(false)}>
                        <p onClick={() => toProfile()}>Profile</p>
                        <p onClick={() => logout()}>Log Out</p>
                    </div> :
                    <div className={`accountModal ${accountModalOpen ? "accountModalOpen" : ""} ${currentTheme ? "light" : "dark"}`} onMouseLeave={() => setAccountModalOpen(false)}>
                        <p onClick={() => login()}>Log In</p>
                        <p onClick={() => singup()}>Sign Up</p>
                    </div>
                }
            </div>
        </div >
    )
}

export default Header