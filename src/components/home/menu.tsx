import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import store from '@/redux/store';
import { useRouter } from 'next/navigation';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';

type Props = {}

const Menu = (props: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    const menus = [
        {
            name: "about",
            link: "/about",
        },
        {
            name: "our product",
            link: "/product",
        },
        {
            name: "blog",
            link: "/blog",
        },
        {
            name: "contact",
            link: "/contact",
        }
    ]
    const toPage = useRouter()
    return (
        <div className={`fixed top-0 right-0 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 ${currentMenu ? "z-10" : "z-[-1]"}`}>
            <div className="max-w-[1200px] m-auto h-full relative px-2 pt-12">
                <CloseIcon className='!w-12 !h-12 p-2 absolute right-0 top-0 text-white cursor-pointer' onClick={() => store.dispatch(setMenu(false))} />
                {currentUser.id ?
                    <div className=" bg-slate-50 rounded max-w-[375px] mr-0 ml-auto p-2 mb-2">
                        <div className='relative mx-auto my-4  w-24 h-24 rounded-[50%] overflow-hidden shadow'>
                            <Image src={process.env.ftp_url + currentUser.avata.name} fill className='object-cover cursor-pointer' alt='avata' />
                        </div>
                        <div className="text-center">
                            <p className='text-2xl font-bold p-2 '>{currentUser.username}</p>
                            <p className='font-bold text-xl p-2 cursor-pointer text-center text-slate-600 opacity-75 hover:opacity-100' onClick={() => toPage.push("/admin/profile")}>profile</p>
                            <p className='font-bold text-xl p-2 cursor-pointer text-center text-slate-600 opacity-75 hover:opacity-100' onClick={() => { localStorage.clear(), store.dispatch(setRefresh()) }}>log out</p>
                        </div>
                    </div> :
                    <div className=" bg-slate-50 rounded max-w-[375px] mr-0 ml-auto p-2 mb-2">
                        <div className="text-center">
                            <p className='text-xl font-bold p-2 '>{currentUser.username}</p>
                            <p className='font-bold text-xl p-2 cursor-pointer text-center text-slate-600 opacity-75 hover:opacity-100' onClick={() => toPage.push("/login")}>login</p>
                            <p className='font-bold text-xl p-2 cursor-pointer text-center text-slate-600 opacity-75 hover:opacity-100' onClick={() => toPage.push("/signup")}>signup</p>
                        </div>
                    </div>}
                <div className="bg-slate-50 rounded max-w-[375px] mr-0 ml-auto py-4">
                    {
                        menus.map((menu, index) =>
                            <div key={index} className='font-bold text-xl p-2 cursor-pointer text-center text-slate-600 opacity-75 hover:opacity-100' onClick={() => { toPage.push(menu.link), store.dispatch(setMenu(false)) }}>
                                <p>{menu.name}</p>
                            </div>)
                    }
                </div>

            </div>
        </div >
    )
}

export default Menu