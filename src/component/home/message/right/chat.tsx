import React, { useState, useRef, useEffect } from 'react'
import Input from '@/component/items/inputA'
import Button from '@/component/items/button'
import CallIcon from '@mui/icons-material/Call';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import Peer from 'simple-peer'
import { Stream } from 'stream';
import { on } from 'events';

type Props = {
    address: string,
    room: string,
    user: any,
    clientId?: string,
    socket?: Socket,
}

const Chat = ({ address, room, user, clientId, socket }: Props) => {
    const videoRef = useRef<any>()
    const childVideo = useRef<any>()
    const viewbox = useRef<any>()
    const currentPeer = useRef<any>()

    const [stream, setStream] = useState<MediaStream>()
    const [signal, setSignal] = useState<Peer.SignalData>()

    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<any[]>([])
    const [refresh, setRefresh] = useState<number>(0)
    const [calling, setCalling] = useState<boolean>(false)
    const [callIncome, setCallIncome] = useState<boolean>(false)
    const [isAnswer, setIsAnswer] = useState<boolean>(false)
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

    const send = async (body: { msg: string, room: string, userId: string }) => {
        await axios.post(process.env.server_url + "user/msg", body, {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },

        })

        setRefresh(refresh => refresh + 1)
        socket?.emit("signal", body)
        setMessage("")
    }

    useEffect(() => {
        viewbox.current ? viewbox.current.scrollTop = viewbox.current.scrollHeight : null
    }, [messages])

    useEffect(() => {
        socket?.on("signal", data => data && setRefresh(refresh => refresh + 1))
        socket?.on("called", data => calling === false ? setCallIncome(data.call) : setCallIncome(false))
        socket?.on("answered", data => {
            data.call === false && endCam()
            setCalling(data.call)
            setIsAnswer(data.call)

        })

    }, [socket])

    const endCam = () => {
        const tracks = stream && stream.getTracks()
        tracks?.forEach((track: MediaStreamTrack) => {
            track.stop()
        })
        // videoRef.current.style.display = "none"
    }
    const call = () => {
        setCalling(true)
        socket?.emit("call", { room, call: true })

    }
    const answer = (a: boolean) => {
        setIsAnswer(a)
        socket?.emit("answer", { room, call: a })
        setCallIncome(false)
        setCalling(a)
    }
    const callend = () => {
        setCalling(false)
        socket?.emit("call", { room, call: false })
        socket?.emit("answer", { room, call: false })
        setIsAnswer(false)
        endCam()
    }


    return (
        <div className={`message_right`}>
            <div className="title">{address} {
                calling ?
                    <span>
                        <PhoneDisabledIcon sx={{ color: "red" }} onClick={() => callend()} />
                        <OpenInNewIcon sx={{ color: "green" }} />
                    </span> :
                    <span>
                        {callIncome ?
                            <>
                                {isAnswer ?
                                    <PhoneDisabledIcon sx={{ color: "red" }} onClick={() => answer(false)} /> :
                                    <>
                                        <span className='noti'>is calling ...</span>
                                        <PhoneCallbackIcon sx={{ color: "green" }} onClick={() => answer(true)} />
                                        <PhoneDisabledIcon sx={{ color: "red" }} onClick={() => answer(false)} />
                                    </>
                                }

                            </> :
                            <CallIcon sx={{ color: "green" }} onClick={() => call()} />}
                    </span>
            }</div>
            <div className="view_box" ref={viewbox}>
                {
                    messages.map((item: any, index) =>
                        <div key={index} className={`msg_box ${item.userId && item.userId._id === user._id ? "client_box" : ""}`}>
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
                    <Button name="send" onClick={() => send({ msg: message, room, userId: user._id })} disable={message ? false : true}></Button>
                </div>
            </div>
            <video ref={videoRef} autoPlay playsInline></video>
            <video ref={childVideo} autoPlay playsInline></video>
        </div>
    )
}

export default Chat