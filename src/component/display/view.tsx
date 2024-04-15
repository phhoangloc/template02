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
    data: any
}

const View = ({ archive, data }: Props) => {

    return (
        <Grid>
            {data?.map((item: any, index: number) => {
                switch (archive) {
                    case "blog":
                        return <Card item={item} key={index} type='large' />
                    case "course":
                        return <Card item={item} key={index} type='large' />
                    case "pic":
                        return <Card item={item} key={index} type='medium' />
                    case "file":
                        return <Card item={item} key={index} />
                }
            })}
        </Grid>
    )

}

export default View