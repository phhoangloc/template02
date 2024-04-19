import React, { useState, useEffect } from 'react'
import Box from '../grid/box'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import GridChild from '../grid/gridChild'
import store from '@/redux/store'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { UserAuthen } from '@/axios/UserAuthen'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import { setPlayer } from '@/redux/reducer/playerReducer'
import BoxDangerous from '../grid/boxDangerous'
import Button from '../input/button'
type Props = {
    item: any,
    type?: string,
    edit?: boolean,
    getSelect?: (e: boolean) => void
}

const Card = ({ item, type, edit, getSelect }: Props) => {

    const toPage = useRouter()

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [select, setSelect] = useState<boolean>(false)
    useEffect(() => {
        getSelect && getSelect(select)
    }, [select])

    const deleteItem = async (position: string, genre: string, name: string, id: string) => {
        if (genre === "file" || genre === "pic") {
            position && await UserAuthen.deleteFile(position, genre, name, id)
        } else {
            position && await UserAuthen.deleteItem(position, genre, id)
        }
        store.dispatch(setRefresh())
    }

    switch (type) {
        case "x-large":
            return (
                <GridChild
                    className={`xs12 sm6 md4`}
                    style={{ borderRadius: "5px", padding: "0px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                >
                    <Box style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", textAlign: "center" }}>
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
                    {edit ?
                        select ?
                            <CheckBoxIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                            <CheckBoxOutlineBlankIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                        null}
                    {edit && <DeleteIcon
                        style={{ position: "absolute", top: "5px", right: "5px" }}
                        onClick={() => deleteItem(currentUser.position, item.genre, item.name, item._id)} />}
                </GridChild>
            )
        case "large":
            return (
                <GridChild
                    className={`xs6 sm6 md4 lg3 `}
                    style={{ borderRadius: "5px", padding: "0px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                >
                    <Box style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", textAlign: "center" }}>
                        {
                            item.cover?.name && <Image src={process.env.google_url + item.cover?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} /> ||
                            item.name && <Image src={process.env.google_url + item?.name} width={500} height={500} style={{ width: "auto", height: "100%" }} alt='ava' priority={true} />
                        }
                    </Box>
                    <Box className='center'
                        style={{ height: "40px", margin: "0px", fontSize: "calc(0.8rem + 0.05%)", textAlign: "center" }}>
                        {item.name && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.name} </p>}
                        {item.title && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                            onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : null }}>{item.title} </p>}
                    </Box>
                    {edit ?
                        select ?
                            <CheckBoxIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                            <CheckBoxOutlineBlankIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                        null}
                    {edit && <DeleteIcon
                        style={{ position: "absolute", top: "5px", right: "5px" }}
                        onClick={() => deleteItem(currentUser.position, item.genre, item.name, item._id)} />}
                </GridChild>
            )
        case "medium":
            return (
                <GridChild
                    className={`xs6 sm4 md3 lg2 `}
                    style={{ borderRadius: "5px", padding: "0px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                >
                    <Box style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", textAlign: "center" }}>
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
                    {edit ?
                        select ?
                            <CheckBoxIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                            <CheckBoxOutlineBlankIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                        null}
                    {edit && <DeleteIcon
                        style={{ position: "absolute", top: "5px", right: "5px" }}
                        onClick={() => deleteItem(currentUser.position, item.genre, item.name, item._id)} />}

                </GridChild>
            )
        case "file":
            return (
                <GridChild
                    className={`xs6 sm4 md3 lg2 borderBox`}
                    style={{ borderRadius: "5px", padding: "0px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                    onClick={() => store.dispatch(setPlayer({ src: process.env.ftp_url + "/" + item.genre + "/" + item.name }))}
                >
                    <Box className='center' style={{ height: "calc(100% - 20%)", position: "relative", margin: 0, overflow: "hidden", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", textAlign: "center" }}>
                        <FilePresentOutlinedIcon style={{ margin: "auto", width: "50px", height: "50px" }} />
                    </Box>
                    <Box className='center'
                        style={{ height: "20%", margin: "5px 0px", fontSize: "calc(0.8rem + 0.05%)", textAlign: "center" }}>
                        {item.name && <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>{item.name} </p>}
                    </Box>
                    {edit ?
                        select ?
                            <CheckBoxIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                            <CheckBoxOutlineBlankIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                        null}
                    {edit && <DeleteIcon
                        style={{ position: "absolute", top: "5px", right: "5px" }}
                        onClick={() => deleteItem(currentUser.position, item.genre, item.name, item._id)} />}

                </GridChild>
            )
        case "title":
            return (
                <GridChild
                    className={`xs12 borderBox`}
                    style={{ height: "150px", borderRadius: "5px", padding: "10px", cursor: "pointer", position: "relative", aspectRatio: 1 }}
                    onClick={() => store.dispatch(setPlayer({ src: process.env.ftp_url + "/" + item.genre + "/" + item.name }))}
                >
                    <Box className='center'
                        style={{ height: "50%", position: "relative", margin: 0, overflow: "hidden", textAlign: "left" }}>
                        <h2 style={{ padding: "5px 0" }}>{item.name}</h2>
                    </Box>
                    <Box className=''
                        style={{ height: "50%", fontSize: "calc(0.8rem + 0.05%)", textAlign: "left" }}>
                        {item.detail && <BoxDangerous detail={item.detail} style={{ height: "60px" }} />}
                    </Box>
                    <Box className='divHoverOpacity1 divHoverColorMain' style={{ position: "absolute", right: "10px", bottom: "10px", borderRadius: "5px", overflow: "hidden", opacity: "0.5" }}>
                        <p style={{ fontSize: "0.75rem " }} onClick={() => toPage.push(item.genre + "/" + item.slug)} >get Started</p>
                    </Box>
                    {edit ?
                        select ?
                            <CheckBoxIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                            <CheckBoxOutlineBlankIcon style={{ position: "absolute", top: "5px", left: "5px" }} onClick={() => setSelect(!select)} /> :
                        null}
                    {edit && <DeleteIcon
                        style={{ position: "absolute", top: "5px", right: "5px" }}
                        onClick={() => deleteItem(currentUser.position, item.genre, item.name, item._id)} />}

                </GridChild>
            )
    }

    return (
        <GridChild
            className={`xs12  ${currentTheme ? 'background_light' : 'background_dark'}`}
            style={{ padding: "5px", cursor: "pointer", position: "relative", margin: "5px 10px", borderBottom: "1px solid #aaa" }}
        >
            <Box style={{ height: "24px", lineHeight: "24px", margin: "5px 0px", fontSize: "0.9rem", textAlign: "center", display: "flex" }}>
                {edit ?
                    select ?
                        <CheckBoxIcon style={{ marginRight: "5px" }} onClick={() => setSelect(!select)} /> :
                        <CheckBoxOutlineBlankIcon style={{ marginRight: "5px" }} onClick={() => setSelect(!select)} /> :
                    null}
                <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap", textAlign: "left" }}
                    onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : item._id ? toPage.push("user" + "/" + item._id) : null }}>{item.title || item.name || item.username} </p>
                {edit && <DeleteIcon onClick={() => deleteItem(currentUser.position, item.genre, item.name, item._id)} />}
            </Box>
        </GridChild>
    )
}

export default Card