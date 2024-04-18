'use client'
import React, { useState, useEffect } from 'react'
import Box from '../grid/box'
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import { useRouter } from 'next/navigation'
import UploadPicturePreview from '../input/uploadPicturePreview'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import Input from '../input/input'
import TextAreaTool from '../input/textareaTool'
import Button from '../input/button'
import PictureModal from '../modal/pictureModal'
import EditIcon from '@mui/icons-material/Edit';
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import AddIcon from '@mui/icons-material/Add';
type Props = {
    archive: string,
    slug: string,
    createNew: boolean,
    updateItem?: (p: string, a: string, id: string | undefined, body: any) => void,
    close?: (e: boolean) => void
}

const SingleEdit = ({ archive, slug, createNew, close, updateItem }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [imgIndex, setImgIndex] = useState<number>(0)
    const [item, setItem] = useState<any>({})
    const [cover, setCover] = useState<any>()
    const [avata, setAvata] = useState<any>()
    const [name, setName] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [newSlug, setNewSlug] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [newDetail, setNewDetail] = useState<string>("")
    const [pictureModal, setPictureModal] = useState<boolean>(false)
    const [newLesson, setNewLesson] = useState<string>("")

    const toPage = useRouter()

    const getItemBySlug = async (p: string, a: string, s: string) => {
        const result =
            a === "user" ?
                await UserAuthen.getOneUserbyId(p, a, s) :
                await UserAuthen.getOneItembySlug(p, a, s)
        if (result?.success && result.data.length) {
            setItem(result.data[0])
            setName(result.data[0].name)
            setUsername(result.data[0].username)
            setNewSlug(result.data[0].slug)
            setDetail(result.data[0].detail)
            setCover(result.data[0].cover)
            setAvata(result.data[0].avata)
            setPosition(result.data[0].position)
        } else {
            setItem({})
        }
    }

    useEffect(() => {
        currentUser?.position && getItemBySlug(currentUser.position, archive, slug)
    }, [currentUser])

    let body: any = {
    }

    const createLesson = async (v: string, course: string) => {
        const body = {
            name: v,
            slug: v,
            course
        }

        const result = v && await UserAuthen.createLesson(currentUser.position, body)
        if (result?.success) {
            store.dispatch(setRefresh())
        }
    }

    useEffect(() => {
        body = {
            cover: cover ? cover._id : item.cover?._id ? item.cover._id : undefined,
            name: name ? name : item.name ? item.name : undefined,
            slug: newSlug ? newSlug : item.slug ? item.slug : undefined,
            detail: newDetail ? newDetail : item.detail ? item.detail : undefined,
            username: username ? username : item.username ? item.usename : undefined,
            avata: avata ? avata._id : item.avata ? item.avata._id : undefined,
        }
        createNew ? updateItem && updateItem(currentUser.position, archive, undefined, body) : updateItem && updateItem(currentUser.position, archive, item._id, body)
    }, [cover, name, newSlug, newDetail, username, avata])

    if (archive === "user") {
        return (
            <Box className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ maxWidth: "992px", margin: "auto", padding: "5px" }}>
                <Box style={{ width: "100%", aspectRatio: 2.5, borderRadius: "5px", textAlign: "center", overflow: "hidden", position: "relative" }}>

                    <UploadPicturePreview
                        icon={<AddPhotoAlternateOutlined />}
                        src={cover?.name ? process.env.google_url + cover?.name : "/img/defaultImg.jpg"}
                        imgstyle={{ position: "absolute", objectFit: "cover", top: 0, left: 0, width: "100%" }}
                        func={() => { setPictureModal(true), setImgIndex(1) }} />

                </Box>
                <Box style={{ display: "flex", transform: "translateY(-50%)" }}>
                    <Box style={{ minWidth: "100px", width: "50%", maxWidth: "200px", aspectRatio: 1, borderRadius: "50%", textAlign: "center", overflow: "hidden", position: "relative", }}>
                        <UploadPicturePreview
                            icon={<AddPhotoAlternateOutlined />}
                            iconStyle={{ position: "absolute", bottom: "12.5%", right: "12.5%", zIndex: 1 }}
                            src={avata?.name ? process.env.google_url + avata?.name : "/img/avata.png"}
                            func={() => { setPictureModal(true), setImgIndex(2) }} />
                    </Box>
                    <Box style={{ margin: "auto 0 0" }}>
                        <Input value={username} name="username" onChange={(e) => setUsername(e)} />
                        <Input value={position} name="position" onChange={(e) => (e)} disabled={true} />
                    </Box>
                </Box>
                <PictureModal open={pictureModal} close={() => setPictureModal(false)} select={(e) => { imgIndex === 1 ? setCover(e) : imgIndex === 2 ? setAvata(e) : null, setPictureModal(false) }} />
                {/* <Box><Button name='save' onClick={() => updateItem(currentUser.position, archive, item._id, body)} /></Box> */}
            </Box>
        )
    }

    if (createNew) {
        return (
            <Box className='grid_box scrollNone'>
                <Box className={`center xs12 md6 lg4 stickyBox`} style={{ height: "50vh", margin: "10px", borderRadius: "5px", top: "25%", textAlign: "center", overflow: "hidden" }}>
                    <UploadPicturePreview
                        icon={<AddPhotoAlternateOutlined />}
                        src={cover?.name ? process.env.google_url + cover?.name : "/img/defaultImg.jpg"}
                        func={() => setPictureModal(true)} />
                </Box>
                <Box className={`detailBox xs12 md6 lg8 `} style={{ overflowX: "hidden", margin: "0 10px" }}>
                    <Input name="name" onChange={(e) => setName(e)} value={name} />
                    <Input name="slug" onChange={(e) => setNewSlug(e)} value={newSlug} />
                    <TextAreaTool name='detail' onChange={(e) => setNewDetail(e)} value={detail} />
                </Box>
                <PictureModal open={pictureModal} close={() => setPictureModal(false)} select={(e) => { setCover(e), setPictureModal(false) }} />
            </Box>
        )
    } else {
        if (archive === "user") {
            return (
                <Box className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ maxWidth: "992px", margin: "auto", padding: "5px" }}>
                    <Box style={{ width: "100%", aspectRatio: 2.5, borderRadius: "5px", textAlign: "center", overflow: "hidden", position: "relative" }}>

                        <UploadPicturePreview
                            icon={<AddPhotoAlternateOutlined />}
                            src={cover?.name ? process.env.google_url + cover?.name : "/img/defaultImg.jpg"}
                            imgstyle={{ position: "absolute", objectFit: "cover", top: 0, left: 0, width: "100%" }}
                            func={() => { setPictureModal(true), setImgIndex(1) }} />

                    </Box>
                    <Box style={{ display: "flex", transform: "translateY(-50%)" }}>
                        <Box style={{ minWidth: "100px", width: "50%", maxWidth: "200px", aspectRatio: 1, borderRadius: "50%", textAlign: "center", overflow: "hidden", position: "relative", }}>
                            <UploadPicturePreview
                                icon={<AddPhotoAlternateOutlined />}
                                iconStyle={{ position: "absolute", bottom: "12.5%", right: "12.5%", zIndex: 1 }}
                                src={avata?.name ? process.env.google_url + avata?.name : "/img/avata.png"}
                                func={() => { setPictureModal(true), setImgIndex(2) }} />
                        </Box>
                        <Box style={{ margin: "auto 0 0" }}>
                            <Input value={username} name="username" onChange={(e) => setUsername(e)} />
                            <Input value={position} name="position" onChange={(e) => (e)} disabled={true} />
                        </Box>
                    </Box>
                    <PictureModal open={pictureModal} close={() => setPictureModal(false)} select={(e) => { imgIndex === 1 ? setCover(e) : imgIndex === 2 ? setAvata(e) : null, setPictureModal(false) }} />
                    {/* <Box><Button name='save' onClick={() => updateItem(currentUser.position, archive, item._id, body)} /></Box> */}
                </Box>
            )
        } else {
            return (
                <Box className='grid_box scrollNone'>
                    <Box className={`center xs12 md6 lg4 stickyBox`} style={{ height: "50vh", margin: "10px", borderRadius: "5px", top: "25%", textAlign: "center", overflow: "hidden" }}>
                        <UploadPicturePreview
                            icon={<AddPhotoAlternateOutlined />}
                            src={cover?.name ? process.env.google_url + cover?.name : item.cover?.name ? process.env.google_url + item.cover.name : "/img/defaultImg.jpg"}
                            func={() => setPictureModal(true)} />
                    </Box>
                    <Box className={`detailBox xs12 md6 lg8 `} style={{ overflowX: "hidden", margin: "0 10px" }}>
                        <Input name="name" onChange={(e) => setName(e)} value={name} />
                        <Input name="slug" onChange={(e) => setNewSlug(e)} value={newSlug} />
                        <TextAreaTool name='detail' onChange={(e) => setNewDetail(e)} value={detail} />
                        {item?.genre === "course" ?
                            <Box className={` boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ padding: "10px", borderRadius: "5px" }}>
                                <Box><h2>Lesson</h2></Box>
                                {
                                    item?.lesson ? item.lesson.map((l: any, index: number) =>
                                        <Box style={{ display: "flex", margin: 0 }} key={index}>
                                            <Input name={`lesson ${index + 1}`} onChange={(e) => (e)} value={l.name} disabled={true} />
                                            <EditIcon onClick={() => toPage.push("/" + item.host.position + "/" + archive + "/" + item.slug + "/" + l.slug)}
                                                style={{ width: "30px", height: "30px", boxSizing: "border-box", padding: "5px", margin: "20px 0" }}
                                            />
                                        </Box>
                                    )
                                        : null
                                }
                                <Box style={{ display: "flex", margin: 0 }} >
                                    <Input name={`new lesson`} onChange={(e) => setNewLesson(e)} value={newLesson} />
                                    <AddIcon onClick={() => createLesson(newLesson, item._id)}
                                        style={{ width: "30px", height: "30px", boxSizing: "border-box", padding: "5px", margin: "20px 0" }}
                                    />
                                </Box>
                            </Box> : null
                        }
                    </Box>
                    <PictureModal open={pictureModal} close={() => setPictureModal(false)} select={(e) => { setCover(e), setPictureModal(false) }} />
                </Box>

            )
        }

    }
}

export default SingleEdit