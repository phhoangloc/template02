import { useState, useEffect, useRef } from "react"
import React from 'react'
import store from "@/redux/store"
import Input from "@/component/items/inputA"
import Button from "@/component/items/button"
import { Socket } from "socket.io-client"
import axios from "axios"
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DardBoard from "./right/dardboard"
import Chat from "./right/chat"
type Props = {
    address?: string,
    socket?: Socket,
    room?: string,
    clientId?: string
}

const Right = ({ address, socket, room, clientId }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })


    if (room && address) {
        return (
            <Chat room={room} address={address} socket={socket} clientId={clientId} user={currentUser} />
        )
    } else {
        return (
            <div className={`message_right center textAlignCenter `}>
                <DardBoard />
            </div>
        )
    }
}

export default Right