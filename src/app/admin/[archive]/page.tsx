'use client'
import View from '@/component/display/view'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import Box from '@/component/grid/box'
import { useRouter } from 'next/navigation'
import Tool from '@/component/display/tool'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import Pagination from '@/component/display/pagination'
type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {

    const toPage = useRouter()
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    }, [])

    const [edit, setEdit] = useState<boolean>(false)

    const [data, setData] = useState<any>()
    const [search, setSearch] = useState<string>("")
    const limit = 24
    const [page, setPage] = useState<number>(0)
    const [end, setEnd] = useState<boolean>(false)


    const getItem = async (p: string, archive: string, search: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, search, skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }
    const getItemV2 = async (p: string, archive: string, search: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, search, skip, limit)
        if (result?.success) {
            if (result?.data?.length) { setEnd(false) } else { setEnd(true) }
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser?.position && getItem(currentUser?.position, params.archive, search, page * limit, limit)
        currentUser?.position && getItemV2(currentUser?.position, params.archive, search, page + 1 * limit, limit)
    }, [currentUser?.position, search, page])

    const getFile = async (e: any, type: string) => {
        var files = e.target.files;
        const file: File = files[0]

        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const result = currentUser.position && await UserAuthen.uploadFile(currentUser.position, file, type)
            store.dispatch(setRefresh())
        }
    }

    const [selects, setSelects] = useState<any[]>([])


    const deleletFiles = async (selects: any[]) => {
        selects.map(async (select: any) => {
            if (select.genre === "file" || select.genre === "pic") {
                await UserAuthen.deleteFile(currentUser.position, select.genre, select.name, select._id)
            } else {
                await UserAuthen.deleteItem(currentUser.position, select.genre, select._id)
            }
            store.dispatch(setRefresh())
        })
    }

    switch (params.archive) {
        case "blog":
        case "course":
        case "user":
            return (
                <Box>
                    <Tool
                        add={() => toPage.push("/admin/" + params.archive + "/new" + params.archive)}
                        onSearch={(s) => setSearch(s)}
                        getEdit={(e) => setEdit(e)}
                        deleteItems={selects.length}
                        onDelete={() => deleletFiles(selects)} />
                    <View archive={params.archive} data={data} edit={edit} sendSelects={(e) => setSelects(e)} />
                    <Pagination skip={limit} sum={data?.length} page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} func={(e) => setPage(e)} end={end} />
                </Box>
            )
        case "pic":
        case "file":
            return (
                <Box>
                    <Tool
                        upLoadFile={(e) => getFile(e, params.archive)}
                        onSearch={(s) => setSearch(s)}
                        getEdit={(e) => setEdit(e)}
                        deleteItems={selects.length}
                        onDelete={() => deleletFiles(selects)} />
                    <View archive={params.archive} data={data} edit={edit} sendSelects={(e) => setSelects(e)} />
                    <Pagination skip={limit} sum={data?.length} page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} func={(e) => setPage(e)} end={end} />
                </Box>
            )
    }

    return (
        <Box>
            <View archive={params.archive} data={data} />
        </Box>
    )
}

export default Page