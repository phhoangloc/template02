
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

const PlayReducer = createSlice({
    name: "Play",
    initialState: { play: false },
    reducers: {
        setPlay: {
            reducer: (state, action: PayloadAction<{ play: boolean, video?: string, audio?: string }>) => {
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
export const { actions, reducer } = PlayReducer
export const { setPlay } = actions;

export default PlayReducer