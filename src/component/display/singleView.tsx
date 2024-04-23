'use client'
import React, { useState, useEffect } from 'react'
import Box from '../grid/box'
import Image from 'next/image'
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import { useRouter } from 'next/navigation'
import BoxDangerous from '../grid/boxDangerous'
import { Grid } from '@mui/material'
import Card from './card'
type Props = {
    archive: string,
    slug: string
}

const SingleView = ({ archive, slug }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [item, setItem] = useState<any>({})

    const toPage = useRouter()

    const getItemBySlug = async (p: string, a: string, s: string) => {
        const result =
            a === "user" ?
                await UserAuthen.getOneUserbyId(p, a, s) :
                await UserAuthen.getOneItembySlug(p, a, s)
        if (result?.success && result.data.length) {
            setItem(result.data[0])
        } else {
            setItem({})
        }
    }

    useEffect(() => {
        currentUser?.position && getItemBySlug(currentUser.position, archive, slug)
    }, [currentUser])

    if (archive === "user") {
        return (
            <Box className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ maxWidth: "992px", margin: "auto", padding: "5px" }}>
                <Box style={{ width: "100%", aspectRatio: 2.5, borderRadius: "5px", textAlign: "center", overflow: "hidden", position: "relative" }}>
                    {
                        item?.cover?.name ?
                            <Image src={process.env.google_url + item?.cover?.name} fill alt='cover' style={{ objectFit: "cover" }} /> :
                            <Image src={"/img/defaultImg.jpg"} sizes='100%' fill alt='cover' style={{ position: "absolute", margin: "auto" }} />
                    }
                </Box>
                <Box style={{ display: "flex", transform: "translateY(-50%)" }}>
                    <Box style={{ minWidth: "100px", width: "50%", maxWidth: "200px", aspectRatio: 1, borderRadius: "50%", textAlign: "center", overflow: "hidden", position: "relative", }}>
                        {
                            item?.avata?.name ?
                                <Image src={process.env.google_url + item?.avata?.name} sizes='100%' fill alt='cover' style={{ position: "absolute", margin: "auto" }} /> :
                                <Image src={"/img/avata.png"} sizes='100%' fill alt='cover' style={{ position: "absolute", margin: "auto" }} />
                        }
                    </Box>
                    <Box style={{ margin: "auto 0 0" }}>
                        <h2>{item.username}</h2>
                        <h3 style={{ opacity: "0.5" }}>{item.position}</h3>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box className={`grid_box scrollNone  ${currentTheme ? "background_light" : "background_dark"} boxShadow`} style={{ borderRadius: "5px" }}>
            <Box className={`center xs12 md5 lg4 stickyBox`} style={{ height: "50vh", maxHeight: "400px", margin: "10px", borderRadius: "5px", top: "25%", textAlign: "center", overflow: "hidden" }}>
                {
                    item?.cover?.name ?
                        <Image src={process.env.google_url + item?.cover?.name} width={500} height={500} alt='cover' style={{ width: "initial", height: "100%", margin: "auto" }} /> :
                        <Image src={"/img/defaultImg.jpg"} width={500} height={500} alt='cover' style={{ width: "initial", height: "100%", margin: "auto" }} />
                }
            </Box>
            <Box className={`xs12 md7 lg8 `} style={{ margin: "10px", padding: "1%", overflowX: "hidden", borderRadius: "5px" }}>
                <Box style={{ textAlign: "justify", padding: "5px 5%" }} >
                    <h2 title={item.name} style={{ paddingBottom: "10px", borderBottom: "1px solid #aaa", width: "100%", textAlign: "center" }}>{item.name}</h2>
                    <BoxDangerous detail={item.detail} style={{ minHeight: "100px", margin: "25px 0 0" }} />
                </Box>
                <Grid>
                    {
                        item?.lesson ? item.lesson.map((l: any, index: number) =>
                            <Card item={l} key={index} type='title' />
                        )
                            : null
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default SingleView