'use client'
import { ApiItem } from '@/api/client'
import Archive from '@/components/home/archive'
import React, { useEffect, useState } from 'react'
import { DetailCard } from '@/components/tool/card/card'
import Header from '@/components/home/header'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DetailPage } from '@/components/home/detail'
type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {

    const [items, setItems] = useState<any[]>([])
    const [item, setItem] = useState<any>()

    const [isNotFound, setIsNotFound] = useState<boolean>(false)

    const getItem = async () => {
        try {

            const result = await ApiItem({ genre: "singlepage", slug: params.archive })
            if (result.success) {
                setItem(result.data[0])
            } else {
                const result = await ApiItem({ genre: params.archive })
                if (result.success) {
                    setItems(result.data)
                } else {
                    setIsNotFound(true)
                }
            }

        } catch (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getItem()
    }, [])


    const toPage = useRouter()

    if (isNotFound) {
        return "NOT FOUND"
    }
    if (item?.id) {
        return <DetailPage data={item} />
    }

    if (items) {
        return <Archive genre={params.archive} data={items} />
    }


}

export default Page