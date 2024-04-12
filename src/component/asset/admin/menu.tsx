'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from 'next/navigation';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhotoIcon from '@mui/icons-material/Photo';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Box from '@/component/grid/box';

const Menu = () => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [i, setI] = useState<number>(0)
    const menus = [
        {
            name: "dashboard",
            icon: <DashboardIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
            link: "/admin"
        },
        {
            name: "authentication",
            icon: <LockIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
            children: [
                {
                    name: "login",
                    icon: <LoginIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/login"
                },
                {
                    name: "sign up",
                    icon: <PersonAddIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/signup"
                },
            ]
        },
        {
            name: "App",
            icon: <AppsIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
            children: [
                {
                    name: "Chat",
                    icon: <ChatIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/chat"
                },
                {
                    name: "Blog",
                    icon: <ArticleIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/blog"
                },
                {
                    name: "Course",
                    icon: <EditNoteIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/course"
                },
                {
                    name: "Picture",
                    icon: <PhotoIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/pic"
                },
                {
                    name: "File",
                    icon: <AttachFileIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
                    link: "/admin/file"
                }
            ]
        },

    ]
    const menusAdmin = [
        {
            name: "User",
            icon: <PersonIcon style={{ width: "30px", height: "30px", margin: "10px" }} />,
            link: "/admin/user",
        }
    ]

    const pStyleOpen: React.CSSProperties = {
        width: "max-content",
        textWrap: "nowrap",
        lineHeight: "50px",
        cursor: "pointer"
    }
    const toPage = useRouter()
    return (
        <Box className={`menu ${currentMenu ? "menuOpen" : ""}`}>
            {
                menus.map((item, index) =>
                    <Box key={index}>
                        <Box style={{ display: "flex", width: "100%" }}
                            onClick={() => item.link ? toPage.push(item.link) : setI(index)}>
                            {item.icon}
                            <p style={currentMenu ? pStyleOpen : {}}>{item.name}</p>
                        </Box>
                        {i === index ?
                            item.children?.map((child: any, childindex: number) =>
                                <Box style={{ display: "flex", width: "100%", opacity: 0.75 }} key={childindex} onClick={() => toPage.push(child.link)}>
                                    {child.icon}
                                    <p style={currentMenu ? pStyleOpen : {}}>{child.name}</p>
                                </Box>

                            ) : null}
                    </Box>
                )

            }
            {
                currentUser.position === "admin" && menusAdmin.map((item, index) =>
                    <Box key={index}>
                        <Box
                            style={{ display: "flex", width: "100%" }}
                            onClick={() => item.link ? toPage.push(item.link) : setI(index)}>
                            {item.icon}
                            <p>{item.name}</p>
                        </Box>
                    </Box>
                )

            }

        </Box>
    )
}

export default Menu