import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import { setPlay } from '@/redux/reducer/PlayReducer'
const MusicList = () => {
    const [play, setCurrentPlay] = useState<{ play: boolean, video?: string, audio?: string }>(store.getState().play)
    const update = () => {
        store.subscribe(() => setCurrentPlay(store.getState().play))
    }

    useEffect(() => {
        update()
    }, [])
    const musics = [
        {
            video: "/video/coffee.mp4",
            audio: "/audio/coffee.mp3"
        }
    ]
    return (
        <div className='lists'>{
            musics.map((music, index) =>
                <div key={index} className={`item ${music.video === play.video ? "itemSelect" : null}`}>
                    <video src={music.video} onClick={() => store.dispatch(setPlay({ play: true, video: music.video, audio: music.audio }))} />
                </div>
            )}
        </div>
    )
}

export default MusicList