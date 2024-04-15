'use client'
import View from '@/component/display/view'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import Box from '@/component/grid/box'
import { useRouter } from 'next/navigation'
import Tool from '@/component/display/tool'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {

    const toPage = useRouter()
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    }, [])


    const [data, setData] = useState<any>()
    const [search, setSearch] = useState<string>("")
    const limit = 10
    const [page, setPage] = useState<number>(0)

    const getItem = async (p: string, archive: string, search: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, search, skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser?.position && getItem(currentUser?.position, params.archive, search, page * limit, limit)
    }, [currentUser?.position, search])

    const getFile = async (e: any, type: string) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            currentUser.position && await UserAuthen.uploadFile(currentUser.position, file, type)
            store.dispatch(setRefresh())
        }
    }

    switch (params.archive) {
        case "blog":
        case "course":
            return (
                <Box>
                    <Tool add={() => toPage.push("/admin/" + params.archive + "/new")} onSearch={(s) => setSearch(s)} />
                    <View archive={params.archive} data={data} />
                </Box>
            )
        case "pic":
        case "file":
            return (
                <Box>
                    <Tool upLoadFile={(e) => getFile(e, params.archive)} onSearch={(s) => setSearch(s)} />
                    <View archive={params.archive} data={data} />
                </Box>
            )
    }

    return (
        <Box>{params.archive}</Box>
    )
}

export default page