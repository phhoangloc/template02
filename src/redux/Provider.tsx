"use client"
import React, { useEffect, useState } from "react"
import store from "./store"
import { Provider } from "react-redux"
import { setUser } from "./reducer/UserReducer"
import Loading from "@/app/loading"
import { useRef } from "react"
import axios from "axios"
import { io } from "socket.io-client"
type Props = {
    children: React.ReactNode
}

const ProviderExport = ({ children }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [menu, setCurrentMenu] = useState<boolean>(false)
    const [play, setCurrentPlay] = useState<{ play: boolean, video?: string, audio?: string }>({ play: false })
    const [currentUser, setCurrentUser] = useState<any>(undefined)
    const [number, setCurrentNumber] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentPlay(store.getState().play))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentNumber(store.getState().refresh))

    }

    useEffect(() => {
        update()
    })

    const checkLogin = async (token: any) => {
        setLoading(true)
        if (token) {
            const result = await axios.get(process.env.server_url + 'user', {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
            if (result.data.success) {
                store.dispatch(setUser(result.data.data))
            } else {
                store.dispatch(setUser({}))
            }
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkLogin(localStorage.token)
    }, [number])

    const audioPlay: any = useRef()

    const playControl = () => {
        if (play.play) {
            audioPlay.current.play()
        } else {
            audioPlay.current.pause()
        }
    }

    useEffect(() => {
        playControl()
    }, [play])

    return (
        <Provider store={store}>
            <div className={`theme ${currentTheme ? "light" : "dark"}`}>
                <audio src={play.audio || '/audio/coffee.mp3'} ref={audioPlay} autoPlay onEnded={() => { audioPlay.current.play() }} />
                {loading ? <Loading /> : children}
            </div>
        </Provider>
    )
}

export default ProviderExport