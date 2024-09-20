'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import store from '@/redux/store';
import Input from '../tool/input/input';
import Button from '../tool/input/button';
import { setNotice } from '@/redux/reducer/noticeReducer';
import TextAreaTool from '../tool/input/textareaTool';
import { ApiItem } from '@/api/client';
import { ApiCreateItem, ApiItemUser, ApiUpdateItem } from '@/api/user';
import EditPicture, { EditAvatar, ImportManyPicture } from '../tool/picture/editPicture';
import axios from 'axios';
import { setAlert } from '@/redux/reducer/alertReducer';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import ImageModal from '../modal/imageModal';

type Props = {
    path1: string,
    path2: string
}
export type ExpriencesType = {
    position: String,
    department: String,
    worktype: String,
    company: String
    place: String
    fromtime?: Date
    totime?: Date
}
export const EditDetailbySlug = ({ path1, path2 }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [coverId, setCoverId] = useState<number>(0)
    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")

    const [cover, setCover] = useState<any>()
    const [isEditCover, setIsEditCover] = useState<boolean>(false)
    const [images, setImages] = useState<any[]>([])
    const [newimages, setNewImages] = useState<any[]>([])
    const [imagesPlus, setImagePlus] = useState<any[]>([])
    const [isEditImages, setIsEditImages] = useState<boolean>(false)

    const [slug, setSlug] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [newContent, setNewContent] = useState<string>("")

    const [picturePre, setPicturePre] = useState<string>("")
    const [list, setList] = useState<any[]>([])
    const [listChapter, setListChapter] = useState<any[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const body = {
        name,
        slug,
        coverId: Number(coverId) || undefined,
        content: newContent || content || undefined,
        updateDate: new Date(),
        images:
        {
            "deleteMany": {},
            "create": imagesPlus.map((c) => {
                return (
                    { "pic": { "connect": { "id": c.picId } } }
                )
            })

        },
    }
    const toPage = useRouter()

    const getItems = async (p: string, a: string, s: string) => {
        const result = await ApiItemUser({ position: p, genre: a, slug: s })
        if (result.success && result.data[0].id) {
            setId(result.data[0].id)
            setName(result.data[0].name)
            setSlug(result.data[0].slug)
            setContent(result.data[0].content)
            setCoverId(result.data[0].coverId)
            setList(result.data[0].list)
            setImagePlus(result.data[0]?.images ? result.data[0]?.images : [])
        }
    }
    useEffect(() => {
        currentUser.position && getItems(currentUser.position, path1, path2)
    }, [currentUser.position])

    const createNewItem = async (p: string, g: string, body: any) => {
        if (body.name && body.slug) {
            const result = await ApiCreateItem({ position: p, genre: g }, body)
            setSaving(true)
            if (result.success) {
                store.dispatch(setNotice({ success: false, msg: result.message, open: true }))
                setTimeout(() => {
                    setSaving(false)
                    store.dispatch(setNotice({ success: false, msg: "", open: false }))
                    toPage.push("/admin/" + g)
                }, 3000)
            } else {
                store.dispatch(setNotice({ success: false, msg: result.message, open: true }))
            }
        } else {
            store.dispatch(setNotice({ success: false, msg: "you must input title and slug", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }
    const updateAnItem = async (p: string, g: string, id: string, body: any) => {
        setSaving(true)
        const result = await ApiUpdateItem({ position: p, genre: g, id: id }, body)
        if (result.success) {
            store.dispatch(setNotice({ success: false, msg: result.message, open: true }))
            setTimeout(() => {
                setSaving(false)
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
                toPage.push("/admin/" + g)
            }, 3000)
        } else {
            store.dispatch(setNotice({ success: false, msg: result.message, open: true }))
            setTimeout(() => {
                setSaving(false)
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }

    useEffect(() => {
        const getPicture = async (id: number) => {
            const result = await ApiItem({ genre: "pic", id: id.toString() })
            if (result.success) {
                setCover(result.data[0].name)
            }
        }
        coverId && getPicture(coverId)
    }, [coverId])

    useEffect(() => {
        const getPicture = async (arr: any[]) => {
            setNewImages([])
            arr.forEach(async a => {
                const result = await ApiItem({ genre: "pic", id: a.picId.toString() })
                if (result.success) {
                    setNewImages(n => [...n, { picId: a.picId, name: result.data[0].name }])
                }
            });
        }
        getPicture(imagesPlus)
    }, [imagesPlus])

    const removePic = (index: number) => {
        imagesPlus.length ? setImagePlus(imgs => imgs.filter(is => is.picId !== imgs[index].picId)) : setImagePlus(images.filter(is => is.picId !== images[index].picId))
    }

    return (
        <div className='h-max bg-white dark:bg-slate-800 shadow-sm m-1 rounded p-6'>
            <div className='flex mb-2 '>
                <p onClick={() => toPage.push(`/admin/`)} className="hover:text-orange-500 cursor-pointer" >admin</p>
                <p className="px-1"> / </p>
                <p onClick={() => toPage.push(`/admin/${path1}/`)} className="hover:text-orange-500 cursor-pointer" >{path1}</p>
            </div>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2'>
                    <Input name="title" onChange={(v) => setName(v)} value={name} sx=' mg-bottom-10px ' />
                    <Input name="slug" onChange={(v) => setSlug(v)} value={slug} sx=' mg-bottom-10px ' />
                </div>
                {path1 !== "news" &&
                    <div className='w-full pl-2 md:w-1/2'>
                        <EditPicture src={picturePre || process.env.ftp_url + "template2/" + cover || ""} setPictureModal={() => { setIsEditImages(false), setIsEditCover(true), setModalOpen(true) }} />
                        <ImportManyPicture src={newimages.map(n => process.env.ftp_url + "template2/" + n.name)} setPictureModal={() => { setIsEditCover(false), setIsEditImages(true), setModalOpen(true) }} onRemove={(index) => { removePic(index) }} />
                    </div>}
            </div>
            <TextAreaTool value={content} onChange={(v) => { setNewContent(v) }} />
            <div className='dp-flex '>
                {id ?
                    <Button name={saving ? "..." : "save"} onClick={() => updateAnItem(currentUser.position, path1, id, body)} sx="bg-main mg-5px" disable={saving} /> :
                    <Button name={saving ? "..." : "create"} onClick={() => createNewItem(currentUser.position, path1, body)} disable={saving} />
                }
            </div>
            <ImageModal modalOpen={modalOpen} onCanel={() => setModalOpen(false)}
                onSubmit={(id) => {
                    isEditCover && setCoverId(Number(id));
                    isEditImages && setImagePlus(imgs => imgs.length ? [...imgs.filter(a => a.picId !== id), { picId: id }] : [...images.filter(a => a.picId !== id), { picId: id }])
                    setModalOpen(false)
                }}
                onSendArray={(arr) => {
                    console.log(arr)
                    arr.forEach(id => {
                        isEditImages && setImagePlus(imgs => imgs.length ? [...imgs.filter(a => a.picId !== id), { picId: id }] : [...images.filter(a => a.picId !== id), { picId: id }])
                    });

                    setModalOpen(false)
                }} />
        </div >
    )
}
export const EditDetailById = ({ path1, path2 }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })


    const [username, setUserName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [cover, setCover] = useState<any>()
    const [coverId, setCoverId] = useState<string>("")
    const [avata, setAvata] = useState<any>()
    const [avataId, setAvataId] = useState<string>("")
    const [position, setPosition] = useState<string>("")




    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [IsAddExp, setIsAddExp] = useState<boolean>(false)

    const [isUpdateCover, setIsUpdateCover] = useState<boolean>(false)
    const [isUpdateAvata, setIsUpdateAvata] = useState<boolean>(false)

    const body = {
        coverId: coverId,
        avataId: avataId,
        username
    }

    const getProfileById = async (id: string) => {
        const result = await ApiItemUser({ position: currentUser.position, genre: path1, id: id })

        if (result.success) {

            setUserName(result.data?.[0]?.username)
            setEmail(result.data?.[0]?.email)
            setCoverId(result.data?.[0]?.coverId)
            setAvataId(result.data?.[0]?.avataId)
            setPosition(result.data?.[0]?.position)
        } else {
            setUserName("")
            setEmail("")
            setCoverId("")
            setAvataId("")
            setPosition("")
        }
    }
    useEffect(() => {
        getProfileById(path2)
    }, [path2])

    const updateProfile = async (id: string, body: any) => {
        const result = await ApiUpdateItem({ position: currentUser.position, genre: "user", id }, body)
        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: "success", open: true }))
            store.dispatch(setRefresh())
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        } else {
            store.dispatch(setNotice({ success: result.success, msg: "failed", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }

    const getPictureCover = async (id: string) => {
        const result = await ApiItem({ genre: "pic", id: id })
        if (result) {
            setCover(result.data[0])
        }
    }
    const getPictureAvata = async (id: string) => {
        const result = await ApiItem({ genre: "pic", id: id })
        if (result) {
            setAvata(result.data[0])
        }
    }

    useEffect(() => {
        coverId && getPictureCover(coverId)
        avataId && getPictureAvata(avataId)
    }, [avataId, coverId])

    const sendMailToChangeEmail = async (email: string) => {
        const result = await axios.post(process.env.server_url + "sendmaitochangeemail", { email })
        if (result.data) {
            store.dispatch(setAlert({ open: true, msg: result.data.msg, value: false }))
        } else {
            store.dispatch(setAlert({ open: true, msg: result.data.msg, value: false }))
        }
    }
    const sendMailToChangePassword = async (email: string) => {
        const result = await axios.post(process.env.server_url + "sendmaitochangepassword", { email })
        if (result.data) {
            store.dispatch(setAlert({ open: true, msg: result.data.msg, value: false }))
        } else {
            store.dispatch(setAlert({ open: true, msg: result.data.msg, value: false }))
        }
    }

    return (
        <div className="">
            <ImageModal modalOpen={modalOpen} onCanel={() => setModalOpen(false)} onSubmit={(id) => {
                isUpdateAvata && setAvataId(id)
                isUpdateCover && setCoverId(id)
                setModalOpen(false)
            }} />
            <div className='pt-5'>
                <div className="mb-5">
                    <EditPicture src={process.env.ftp_url + "template2/" + cover?.name} setPictureModal={() => { setModalOpen(true), setIsUpdateCover(true), setIsUpdateAvata(false) }} />
                </div>
                <div className="w-full mt-[-10%]">
                    <EditAvatar src={process.env.ftp_url + "template2/" + avata?.name} setPictureModal={() => { setModalOpen(true), setIsUpdateCover(false), setIsUpdateAvata(true) }} />

                </div>
                <div className="w-max m-auto py-10 text-center">
                    <h2 className='font-bold text-xl mb-1'>{username}</h2>
                    <h3 className='font-bold text-lg mb-1 opacity-75'>{position}</h3>
                </div>
                <Input sx='bg-white dark:bg-slate-800 shadow' name="username" onChange={(v) => setUserName(v)} value={username} />
                <div className='mb-1'>change your email</div>
                <div className="flex ">
                    <Input name="current email" sx='bg-white dark:bg-slate-800 shadow !w-full' onChange={(v) => setEmail(v)} value={email} disabled={true} />
                    <Button onClick={() => sendMailToChangeEmail(email)} name="send" sx="!my-0 !ml-1" />
                </div>
                <div className='mb-1'>reset your password</div>
                <div className="flex">
                    <Input name="current email" sx='bg-white dark:bg-slate-800 shadow !w-full' onChange={(v) => setEmail(v)} value={email} disabled={true} />
                    <Button onClick={() => sendMailToChangePassword(email)} name="send" sx="!my-0 !ml-1" />
                </div>
            </div>
            <div className=''>
                <Button onClick={() => updateProfile(path2, body)} name="save" sx="bg-main mg-5px-0px" />
            </div>
        </div>

    )
}