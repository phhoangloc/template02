'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import Box from '@/component/grid/box'
import SingleLessonView from '@/component/display/singleLessonView'
import Button from '@/component/input/button'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
type Props = {
    params: {
        archive: string,
        slug: string,
        lesson: string
    }
}

const Page = ({ params }: Props) => {

    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()


    const [item, setItem] = useState<any>({})
    const [edit, setEdit] = useState<boolean>(false)
    const [body, setBody] = useState<any>()

    const getItemBySlug = async (p: string, l: string, s: string) => {
        const result = await UserAuthen.viewLesson(p, l, s)
        if (result?.success && result.data.length) {
            setItem(result.data[0])
        } else {
            setItem({})
        }
    }

    useEffect(() => {
        currentUser?.position && getItemBySlug(currentUser.position, params.lesson, params.slug,)
    }, [currentRefresh, currentUser?.position])

    const updateLesson = async (p: string, id: string, body: any) => {
        // console.log(p, id, body)
        const result = await UserAuthen.updateLesson(p, id, body)
        if (result.success) {
            store.dispatch(setRefresh())
        }
    }
    return (
        <Box>
            <Box style={{ width: "100%", maxWidth: "768px", margin: "0 auto", display: "flex" }}>
                {edit ?
                    <>
                        <Button name='save' onClick={() => { updateLesson(currentUser.position, item._id, body), setEdit(false) }} />
                        <Button name='cancel' onClick={() => setEdit(false)} />
                    </> :
                    <Button name='edit' onClick={() => setEdit(true)} />
                }
            </Box>
            <SingleLessonView lesson={item} edit={edit} updateLesson={(data) => setBody(data)} />
        </Box >
    )
}

export default Page