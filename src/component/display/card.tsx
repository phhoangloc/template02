import React, { useState, useEffect } from 'react'
import Box from '../grid/box'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import GridChild from '../grid/gridChild'
import store from '@/redux/store'
type Props = {
    item: any,
    type?: string,
}

const Card = ({ item, type }: Props) => {

    const toPage = useRouter()

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    switch (type) {
        case "x-large":
            return (
                <GridChild
                    className={`xs12 sm6 md4  boxShadow ${currentTheme ? 'background_light' : 'background_dark'}`}
                    style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                >
                    <Box style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderRadius: "5px", textAlign: "center" }}>
                        {
                            item.cover?.name && <Image src={process.env.google_url + item.cover?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} /> ||
                            item.name && <Image src={process.env.google_url + item?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} />
                        }
                    </Box>
                    <Box className='center'
                        style={{ height: "40px", margin: "5px 0px", fontSize: "calc(0.8rem + 0.05%)", textAlign: "center" }}>
                        {item.name && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.name} </p>}
                        {item.title && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.title} </p>}
                    </Box>
                </GridChild>
            )
        case "large":
            return (
                <GridChild
                    className={`xs6 sm6 md4 lg3 boxShadow ${currentTheme ? 'background_light' : 'background_dark'}`}
                    style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                >
                    <Box style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderRadius: "5px", textAlign: "center" }}>
                        {
                            item.cover?.name && <Image src={process.env.google_url + item.cover?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} /> ||
                            item.name && <Image src={process.env.google_url + item?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} />
                        }
                    </Box>
                    <Box className='center'
                        style={{ height: "40px", margin: "5px 0px", fontSize: "calc(0.8rem + 0.05%)", textAlign: "center" }}>
                        {item.name && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.name} </p>}
                        {item.title && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.title} </p>}
                    </Box>
                </GridChild>
            )
        case "medium":
            return (
                <GridChild
                    className={`xs6 sm4 md3 lg2 boxShadow ${currentTheme ? 'background_light' : 'background_dark'}`}
                    style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                >
                    <Box style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderRadius: "5px", textAlign: "center" }}>
                        {
                            item.cover?.name && <Image src={process.env.google_url + item.cover?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} /> ||
                            item.name && <Image src={process.env.google_url + item?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} />
                        }
                    </Box>
                    <Box className='center'
                        style={{ height: "20%", margin: "5px 0px", fontSize: "calc(0.8rem + 0.05%)", textAlign: "center" }}>
                        {item.name && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.name} </p>}
                        {item.title && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.title} </p>}
                    </Box>
                </GridChild>
            )
    }

    return (
        <GridChild
            className={`xs12 boxShadow ${currentTheme ? 'background_light' : 'background_dark'}`}
            style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative" }}
        >
            <Box style={{ margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap", textAlign: "left" }}
                    onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.title || item.name} </p>
            </Box>
        </GridChild>
    )
}

export default Card