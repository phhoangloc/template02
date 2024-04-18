'use client'

import SingleEdit from '@/component/display/singleEdit'
import SingleView from '@/component/display/singleView'
import Box from '@/component/grid/box'
import Button from '@/component/input/button'
import React, { useState } from 'react'
import { UserAuthen } from '@/axios/UserAuthen'
import { useRouter } from 'next/navigation'
type Props = {
    params: {
        archive: string,
        slug: string
    }
}

const Page = ({ params }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>()

    const toPage = useRouter()

    const createNewItem = async (p: string, a: string, body: any) => {
        if (body.name && body.slug) {
            const result = body.name && body.detail && await UserAuthen.createItem(p, a, body)
            if (result.success) {
                toPage.push("/admin/" + params.archive + "/" + params.slug)
            }
        } else {
            alert("you must input name and slug")
        }
    }

    const updateItem = async (p: string, a: string, id: string, body: any) => {

        if (params.archive === "user" || (body.slug && body.name)) {
            const result = await UserAuthen.updateItem(p, a, id, body)
            if (result.success) {
                toPage.push("/admin/" + params.archive + "/" + params.slug)
                setEdit(false)
            }
        } else {
            alert("you must input name and slug")
        }
    }
    if (params.slug === `new${params.archive}`) {
        return (
            <Box>
                <Button name='create' onClick={() => createNewItem(editData.d, editData.a, editData.body)} />
                <SingleEdit archive={params.archive} slug={params.slug} createNew={true} updateItem={(d, a, id, body) => setEditData({ d, a, body })} />
            </Box>
        )
    }

    return (
        <Box>
            <Box style={{ marginBottom: "25px", display: "flex" }}>
                {edit ? <Button name="save" onClick={() => updateItem(editData.d, editData.a, editData.id, editData.body)} /> : null}
                <Box style={{ margin: "0 5px" }}><Button name={edit ? "cancel" : "edit"} onClick={() => setEdit(!edit)} /></Box>
            </Box>
            {edit ? <SingleEdit archive={params.archive} slug={params.slug} createNew={false} close={(e) => setEdit(e)} updateItem={(d, a, id, body) => setEditData({ d, a, id, body })} /> : <SingleView archive={params.archive} slug={params.slug} />}
        </Box>
    )
}

export default Page