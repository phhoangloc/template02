'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import { setMenu } from '@/redux/reducer/MenuReducer'
const Menu = () => {
    const toPage = useRouter()
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }
    useEffect(() => {
        update()
    })

    const menuList = [
        {
            url: "/home",
            name: "Home"
        },
        {
            url: "/home/about",
            name: "About"
        },
        {
            url: "/home/book",
            name: "Book"
        },
        {
            url: "/home/blog",
            name: "Blog"
        },
        {
            url: "/home/contact",
            name: "Contacts"
        },
    ]
    return (
        <div className={`menu center ${currentTheme ? "dark" : "light"} ${currentMenu ? "menuOpen" : null}`}>
            <div className="menu_box">
                {menuList.map((item, index) =>
                    <h2 key={index} onClick={() => {
                        toPage.push(item.url);
                        setTimeout(() => {
                            store.dispatch(setMenu(false))
                        }, 1000)
                    }}>{item.name}</h2>)}
            </div>
        </div>
    )
}

export default Menu