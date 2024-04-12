import React, { useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import Box from '../grid/box'
type Props = {
    data: any[],
    style: React.CSSProperties,
    onClick?: () => void
}

const Divider = ({ data, style, onClick }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const toPage = useRouter()

    return (
        <Box
            className={`${currentTheme ? "background_light" : "background_dark"} transition1_2s`}
            style={style}>{
                data.map((item, index) =>
                    <Box className='divHoverBGMain' key={index} style={{ textAlign: "center", height: "40px", lineHeight: "40px", fontWeight: "bold", cursor: "pointer", borderRadius: "5px" }}
                        onClick={() => { onClick && onClick(), item.func ? item.func() : toPage.push(item.link) }}><p>{item.name}</p>
                    </Box>)
            }</Box>
    )
}

export default Divider