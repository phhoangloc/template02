import React from 'react'
import { useRouter } from 'next/navigation'
type Props = {}

const Template = (props: Props) => {
    const templates = [
        {
            name: "template1",
            detail: "detail1",
            link: "/template/tp_01"
        },
        {
            name: "template1",
            detail: "detail1",
            link: "/template/tp_02"
        },
        {
            name: "template1",
            detail: "detail1",
            link: "/template/tp_03"
        },
        {
            name: "template1",
            detail: "detail1",
            link: "/template/tp_04"
        },
        {
            name: "template1",
            detail: "detail1",
            link: "/template/tp_05"
        },

    ]
    const toPage = useRouter()
    return (
        <div className=' bg-slate-100'>
            <div className='max-w-[1200px] m-auto py-40 p-4'>
                <div className='text-3xl font-bold mb-10'>MY TEMPLATES</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  '>
                    {
                        templates.map((t, index) =>
                            <div key={index} className='aspect-square bg-white rounded cursor-pointer' onClick={() => toPage.push(t.link)}>
                                <div className='h-2/3 flex flex-col justify-center bg-slate-50  text-center'> NO IMAGE</div>
                                <div className='h-1/3 p-4'>
                                    <p>{t.name}</p>
                                    <p>{t.detail}</p>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Template