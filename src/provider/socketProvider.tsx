'use client'
import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';
import store from '@/redux/store';
import { setRefresh } from '@/redux/reducer/RefreshReducer';
const SocketContext = createContext(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [socket, setSocket] = useState<any>();

    useEffect(() => {
        const newsocket = currentUser && io(`${process.env.server_url}`)

        setSocket(newsocket)

        return () => { newsocket && newsocket.disconnect() }

    }, [currentUser])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
export { SocketContext };