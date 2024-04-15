'use client'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import Divider from '@/component/display/divider';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import Image from 'next/image';
import Box from '@/component/grid/box';

const Header = () => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))

    }

    useEffect(() => update())

    const deviders = [
        {
            name: "log in",
            link: "/admin/login"
        },
        {
            name: "sign up",
            link: "/admin/signup"
        }
    ]
    const profiles = [
        {
            name: "profile",
            link: "/admin/profile"
        },
        {
            name: "log out",
            func: () => { localStorage.clear(); store.dispatch(setRefresh()) }
        }
    ]

    const [dividerOpen, setDividerOpen] = useState<boolean>(false)

    return (
        <Box style={{ display: "flex", height: "50px", width: "100%", overflow: "hidden" }}>
            {currentMenu ?
                <MenuOpenIcon style={{ width: "30px", height: "30px", margin: "10px" }} onClick={() => store.dispatch(setMenu(false))} /> :
                <MenuIcon style={{ width: "30px", height: "30px", margin: "10px" }} onClick={() => store.dispatch(setMenu(true))} />}
            <Box style={{ margin: "auto 5px auto auto" }}>
                {currentUser?.avata ?
                    <Image src={process.env.google_url + currentUser?.avata?.name} width={500} height={500} alt='ava' style={{ width: "30px", height: "30px", margin: "10px", cursor: "pointer", borderRadius: "50%" }} onClick={() => setDividerOpen(!dividerOpen)} /> :
                    <PersonIcon style={{ width: "30px", height: "30px", margin: "10px" }} onClick={() => setDividerOpen(!dividerOpen)} />}
                {currentTheme ?
                    <DarkModeIcon style={{ width: "30px", height: "30px", margin: "10px" }} onClick={() => store.dispatch(setTheme(false))} /> :
                    <LightModeIcon style={{ width: "30px", height: "30px", margin: "10px" }} onClick={() => store.dispatch(setTheme(true))} />}
            </Box>
            {currentUser._id ?
                <Divider
                    data={profiles}
                    style={{ position: "absolute", top: "40px", right: "5px", width: "150px", transform: dividerOpen ? "translateX(0%)" : "translateX(110%)", padding: "5px", borderRadius: "5px", zIndex: 2 }}
                    onClick={() => setDividerOpen(false)} /> :
                <Divider
                    data={deviders}
                    style={{ position: "absolute", top: "40px", right: "5px", width: "150px", transform: dividerOpen ? "translateX(0%)" : "translateX(110%)", padding: "5px", borderRadius: "5px", zIndex: 2 }}
                    onClick={() => setDividerOpen(false)} />
            }
        </Box>
    )
}

export default Header