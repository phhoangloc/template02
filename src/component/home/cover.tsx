import React, { useRef, useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import store from '@/redux/store';
import { setPlay } from '@/redux/reducer/PlayReducer';
import MusicList from '../items/musicList';

const Cover = () => {
    const videoPlay: any = useRef()

    const [play, setCurrentPlay] = useState<{ play: boolean, video?: string, audio?: string }>(store.getState().play)
    const update = () => {
        store.subscribe(() => setCurrentPlay(store.getState().play))
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <div className="cover">
            <video ref={videoPlay} src={play.video || "/video/coffee.mp4"} autoPlay playsInline muted onEnded={() => {
                videoPlay.current.play()
            }} />
            <div className="tool">
                {
                    play.play ?
                        <PauseIcon onClick={() => { store.dispatch(setPlay({ play: false, video: play.video, audio: play.audio })) }} /> :
                        <PlayArrowIcon onClick={() => { store.dispatch(setPlay({ play: true, video: play.video, audio: play.audio })) }} />
                }
                <MusicList />
            </div>
        </div>
    )
}

export default Cover