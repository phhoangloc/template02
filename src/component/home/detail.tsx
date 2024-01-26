'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
type Props = {
    params: { archive: string, slug: string }
}

const Detail = ({ params }: Props) => {

    const [item, setItem] = useState<any>()
    const getItem = async () => {
        const result = await axios.get(process.env.server_url + params.archive + "?slug=" + params.slug)
        setItem(result.data.data[0])
    }
    useEffect(() => {
        getItem()
    }, [])

    const reCom = item &&
        <div className='detail'>
            <div className="left xs12 md6">
                <Image src={item.img === "/img/coffee.jpg" ? process.env.server_url + item.img : process.env.google_url + item.img} alt={"img"} width={500} height={500} />
            </div>
            <div className="right xs12 md6">
                <div className=''>
                    <p className='title'>{item && (item.name || item.title)}</p>
                    <p className='author'>{item && item.author && (item.author.username || item.author)}</p>
                </div>
                <div className='page textJustify' dangerouslySetInnerHTML={{
                    __html: item.detail
                }}
                />
            </div>
        </div>
    return reCom
}

export default Detail