'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Grid from '../grid/grid'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import GridChild from '../grid/gridChild'
import Box from '../grid/box'
type Props = {
    archive: string,
    data: any
}

const ViewBlog = ({ archive, data }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })
    const toPage = useRouter()


    return (
        <Grid>
            {data?.map((item: any, index: number) =>
                <GridChild
                    className={`xs6 sm4 md3 boxShadow ${currentTheme ? 'background_light' : 'background_dark'}`}
                    key={index}
                    style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative" }}
                >
                    <Box style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, }}>
                        {
                            item.cover?.name && <Image src={process.env.google_url + item.cover?.name} fill sizes='100%' style={{ objectFit: 'cover', borderRadius: "5px" }} alt="/img/defaultImg.jpg" priority={true} /> ||
                            <Image src="/img/defaultImg.jpg" fill sizes='100%' style={{ objectFit: 'cover', borderRadius: "5px" }} alt='ava' priority={true} />
                        }
                    </Box>
                    <Box style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                        <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.name} </p>
                    </Box>
                </GridChild>
            )}
        </Grid>
    )

}

export default ViewBlog