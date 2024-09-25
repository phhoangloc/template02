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
        <div className='flex flex-wrap bg-slate-100'>
            <div className='w-full h-screen md:w-1/2  flex flex-col justify-center md:sticky top-0'>
                <div className="max-w-[800px] ml-auto mr-0 w-full min-h-96">
                    <DetailCard data={_data} />
                </div>
            </div>
            <div className="w-full md:w-1/2 min-h-screen bg-white ">
                <div className="max-w-[800px] ml-0">
                    <div className=' w-5/6 m-auto py-10 text-justify ' dangerouslySetInnerHTML={{ __html: _data?.content }} />
                </div>
            </div>
        </div>
    )
}

export default Page