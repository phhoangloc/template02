'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Login from './login'
import axios from 'axios'
import Left from './message/left'
import Right from './message/right'
import { SocketContext } from '@/provider/socketProvider'
import { useContext } from 'react'
import store from '@/redux/store'
const Message = () => {
    const [noti, setNoti] = useState<string>("")

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => { update() }, [])


    const socket = useContext<any>(SocketContext);

    const [onlineList, setOnlineList] = useState<{ _id: string, username: string, avata: string }[]>([])

    const [address, setAdress] = useState<string>("")
    const [room, setRoom] = useState<string>("")
    const [clientId, setClientId] = useState<string>("")

    useEffect(() => {

        socket && socket.emit("hello", { _id: currentUser._id, username: currentUser.username, avata: currentUser.infor?.avata })

        socket && socket.on("online", (data: any) => {
            setOnlineList(data)
        })

    }, [socket])

    if (currentUser && currentUser._id) {
        return (
            <div className='message'>
                <div className={`notificaion ${noti ? "notificaion_open" : ""}`}>{noti}</div>
                <Left
                    onlineLists={onlineList}
                    selectAddress={(add) => setAdress(add)}
                    selectRoom={(room) => setRoom(room)}
                    selectClientId={(clientId) => setClientId(clientId)}
                    socket={socket} />
                <Right
                    address={address}
                    room={room}
                    clientId={clientId}
                    socket={socket} />
            </div>
        )
    } else {
        return (
            <div className='height-100vh center textAlignCenter'>
                <Login />
            </div>
        )
    }
}

export default Message