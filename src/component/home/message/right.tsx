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

    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<any[]>([])
    const [refresh, setRefresh] = useState<number>(0)

    const send = async (body: { msg: string, room: string, userId: string }) => {
        await axios.post(process.env.server_url + "user/msg", body, {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },

        })

        await axios.put(process.env.server_url + "noti?id=" + clientId, { noti: `you have a message`, from: currentUser._id, type: "msg" }, {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        })

        setRefresh(refresh => refresh + 1)
        socket?.emit("signal", body)
        setMessage("")
    }

    const getMsg = async (token: string, room: string) => {
        const result = await axios.get(process.env.server_url + "user/room?roomId=" + room,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },

            })
        setMessages(result.data.data[0].messages)

    }

    useEffect(() => {
        room && getMsg(localStorage.token, room)
    }, [room, refresh])

    useEffect(() => {
        socket?.on("signal", data => data && setRefresh(refresh => refresh + 1))
    }, [socket])

    const viewbox = useRef<any>()

    useEffect(() => {
        viewbox.current ? viewbox.current.scrollTop = viewbox.current.scrollHeight : null
    }, [messages])

    const [calling, setCalling] = useState<boolean>(false)
    if (room && address) {
        return (
            <div className={`message_right`}>
                <div className="title">{address} {
                    calling ?
                        <span>
                            <CallEndIcon sx={{ color: "red" }} onClick={() => setCalling(false)} />
                            <OpenInNewIcon sx={{ color: "green" }} />
                        </span> :
                        <span>
                            <CallIcon sx={{ color: "green" }} onClick={() => setCalling(true)} />
                        </span>
                }</div>
                <div className="view_box" ref={viewbox}>
                    {
                        messages.map((item: any, index) =>
                            <div key={index} className={`msg_box ${item.userId && item.userId._id === currentUser._id ? "client_box" : ""}`}>
                                <p className="msg_box_name">{item.userId && item.userId.username}</p>
                                <p className="msg_box_msg">{item.msg}</p>
                            </div>)
                    }
                </div>
                <div className="input_box">
                    <div className="input_area">
                        <div className="tool"></div>
                        <Input name="massage" onChange={(data) => setMessage(data)} value={message} />
                    </div>
                    <div className="send_area">
                        <Button name="send" onClick={() => send({ msg: message, room, userId: currentUser._id })} disable={message ? false : true}></Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`message_right center textAlignCenter `}>
                <div className="notAddressText"><h3>share your idea...</h3></div>
            </div>
        )
    }
}

export default Right