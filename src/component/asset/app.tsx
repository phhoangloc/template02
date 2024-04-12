'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import Grid from '../grid/grid'
import GridChild from '../grid/gridChild'
const App = () => {
    const apps = [
        {
            icon: "/icon/home.png",
            name: "Home",
            link: "/home"
        },
        {
            icon: "/icon/study.png",
            name: "Study",
            link: "/study"
        },
        {
            icon: "/icon/chatGPT.png",
            name: "Chat GPT",
            link: "https://chat.openai.com/"
        },
        {
            icon: "/icon/gmail.ico",
            name: "Gmail",
            link: "https://mail.google.com/"
        },
        {
            icon: "/icon/youtube.png",
            name: "Youtube",
            link: "https://youtube.com/"
        },
    ]
    const toPage = useRouter()
    return (
        <Grid className=' grid_box' style={{ width: "100%", maxWidth: "992px", margin: "0 auto", zIndex: 2 }}>
            {
                apps.map((item: any, index: number) =>
                    <GridChild className={`xs3 sm2 divHoverScale1_1`} key={index}
                        onClick={() => toPage.push(item.link)}
                        style={{ padding: "10px", cursor: "pointer", transition: "all 0.5s" }} >
                        <Image src={item.icon} alt='icon' width={500} height={500} style={{ width: "100%", height: "auto" }} onClick={() => toPage.push(item.link)} />
                    </GridChild>
                )}
        </Grid>
    )
}

export default App