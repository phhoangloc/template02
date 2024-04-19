import React, { useEffect, useRef, useState } from 'react'
import Box from '../grid/box'
import store from '@/redux/store'
import { PlayerType, setPlayer } from '@/redux/reducer/playerReducer'

const PlayerModal = () => {

    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(store.getState().player)

    const update = () => {
        store.subscribe(() => setCurrentPlayer(store.getState().player))
    }

    useEffect(() => {
        update()
    })
    const player: any = useRef()

    return (
        <Box>
            {currentPlayer?.src ? <audio ref={player} src={currentPlayer?.src} autoPlay onEnded={() => store.dispatch(setPlayer({ src: "" }))} /> : null}
        </Box>
    )
}

export default PlayerModal