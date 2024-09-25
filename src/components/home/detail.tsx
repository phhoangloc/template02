import React from 'react'
import Header from './header'
type Props = {
    data: any
}

export const DetailPage = ({ data }: Props) => {
    return (
        <div className='min-h-screen bg-white '>
            <Header />
            <div className='max-w-[1200px] m-auto py-24'>
                <div className='text-3xl font-bold mb-12'>
                    <div>{data.name}</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
        </div>
    )
}