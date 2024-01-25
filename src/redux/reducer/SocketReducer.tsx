
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client"

const SocketReducer = createSlice({
    name: "Socket",
    initialState: {} as Socket,
    reducers: {
        setSocket: {
            reducer: (state, action: PayloadAction<any>) => {
                return (state = action.payload)
            },
            prepare: (msg) => {
                return {
                    payload: msg
                }
            }
        }
    }
})
export const { actions, reducer } = SocketReducer
export const { setSocket } = actions;

export default SocketReducer