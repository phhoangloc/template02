'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'

import Image from 'next/image';
import axios from 'axios';

import { Socket } from 'socket.io-client';


type Props = {
    onlineLists?: { _id: string, username: string, avata: string, }[]
    selectAddress?: (v: string) => void;
    selectRoom?: (v: string) => void;
    selectClientId?: (v: string) => void;
    socket?: Socket
}

const Left = ({ onlineLists, selectAddress, socket, selectRoom, selectClientId }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    }, [])


    const enterRoom = async (id: string, username: string) => {

        const result = await axios.post(process.env.server_url + 'user/room?clientUser=' + id, {}, {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        })

        await axios.put(process.env.server_url + "noti?id=" + currentUser._id, { noti: `you have a message`, from: id, type: "msg", seen: true }, {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        })

        socket?.emit("enterRoom", result.data._id)
        selectRoom && selectRoom(result.data._id)
        selectAddress && selectAddress(username)
        selectClientId && selectClientId(id)
        socket?.emit("signal", { room: result.data._id })
    }

    const hiddenRoom = () => {
        selectAddress && selectAddress("")
    }

    const [notificaion, setNotification] = useState<[]>([])
    const [number, setNumber] = useState<number>(0)

    const getNotificationUnseen = async () => {
        const result = await axios.get(process.env.server_url + "noti?seen=false&&type=msg", {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        })

        if (result.data.success) {
            setNotification(result.data.data)
        }
    }

    useEffect(() => {
        getNotificationUnseen()
    }, [number])

    useEffect(() => {
        socket?.on("signal", (data: any) => setNumber((prev) => prev + 1))
    }, [socket])

    const [users, setUsers] = useState<{ _id: string, username: string, infor: { avata: string }, }[]>([])
    const getAlluser = async () => {
        const result = await axios.get(process.env.server_url + 'user/alluser', {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            }
        })
        setUsers(result.data.data)
    }
    useEffect(() => {
        getAlluser()
    }, [])
    return (
        <div className={`message_left ${currentTheme ? "light" : "dark"}`}>
            <div className='item online' onClick={() => hiddenRoom()}>
                <div className="avata">
                    {currentUser && currentUser.infor && currentUser.infor.avata ? <Image src={process.env.google_url + currentUser.infor.avata} width={50} height={50} alt='avata' /> : ""}
                </div>
                <div className="text">{currentUser.username}</div>
            </div>
            {
                users && users.map((item, index) => {
                    const newnoti = notificaion.filter((noti: any) => noti.from === item._id)
                    const onlines = onlineLists && onlineLists.filter((onl: any) => onl._id === item._id)
                    console.log(onlines && onlines.length)
                    return <div className={`item ${onlines && onlines.length ? "online" : ""}`} key={index} onClick={() => { enterRoom(item._id, item.username) }} style={item._id === currentUser._id ? { display: "none" } : {}}>
                        <div className="avata">
                            {item.infor && item.infor.avata ? <Image src={process.env.google_url + item.infor.avata} width={50} height={50} alt='avata' /> : ""}
                        </div>
                        <div className="text">{item.username}</div>
                        {newnoti.length ? <div className='noti' ><p key={index}>{newnoti.length}</p></div> : ""}
                    </div>
                })
            }
        </div>
    )
}

export default Left