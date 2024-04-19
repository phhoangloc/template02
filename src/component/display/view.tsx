'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Grid from '../grid/grid'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import GridChild from '../grid/gridChild'
import Box from '../grid/box'
import Card from './card'
type Props = {
    archive: string,
    data: any,
    edit?: boolean,
    sendSelects?: (e: any[]) => void
}

const View = ({ archive, data, edit, sendSelects }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [selects, setSelects] = useState<any[]>([])

    const getSelect = (e: boolean, item: any, i: number) => {
        if (e) {
            var newSelect = selects.filter((it: any, index: number) => index != i)
            newSelect = [...newSelect, item]
            setSelects(newSelect)
        } else {
            setSelects(s => s.filter((it: any, index: number) => index != i))
        }
    }

    useEffect(() => {
        sendSelects && sendSelects(selects)
    }, [selects])

    return (
        <Grid className={`${currentTheme ? "background_light" : "background_dark"} boxShadow`} style={{ borderRadius: "5px", margin: "10px 0", padding: "5px" }}>
            {data?.map((item: any, index: number) => {
                switch (archive) {
                    case "blog":
                        return <Card item={item} key={index} type='large' edit={edit} getSelect={(e) => getSelect(e, item, index)} />
                    case "course":
                        return <Card item={item} key={index} type='large' edit={edit} getSelect={(e) => getSelect(e, item, index)} />
                    case "pic":
                        return <Card item={item} key={index} type='medium' edit={edit} getSelect={(e) => getSelect(e, item, index)} />
                    case "file":
                        return <Card item={item} key={index} type='file' edit={edit} getSelect={(e) => getSelect(e, item, index)} />
                    case "user":
                        return <Card item={item} key={index} edit={edit} getSelect={(e) => getSelect(e, item, index)} />
                }
            })}
        </Grid>
    )

}

export default View