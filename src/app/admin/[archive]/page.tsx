'use client'
import View from '@/component/display/view'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import ViewBlog from '@/component/display/viewBlog'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    }, [])


    const [data, setData] = useState<any>()
    const limit = 10
    const [page, setPage] = useState<number>(0)

    const getItem = async (p: string, archive: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])

        }
    }

    useEffect(() => {
        currentUser?.position && getItem(currentUser?.position, params.archive, page * limit, limit)
    }, [currentUser?.position])

    switch (params.archive) {
        case "blog":
            return <ViewBlog archive={params.archive} data={data} />

    }
    return (
        <div>{params.archive}</div>
    )
}

export default page