'use client'
import { ApiItem } from '@/api/client'
import { DetailCard } from '@/components/tool/card/card'
import React, { useEffect, useState } from 'react'

type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    const [_data, set_data] = useState<any>()
    const getItem = async () => {
        const result = await ApiItem({ genre: params.archive, slug: params.slug })
        console.log(result)
        if (result.success) {
            set_data(result.data[0])
        }
    }
    useEffect(() => {
        getItem()
    }, [])
    return (
        <div>
            <div>archive:{params.archive}</div>
            <div>slug:{params.slug}</div>
            <DetailCard data={_data ? _data : {}} />
        </div>
    )
}

export default Page