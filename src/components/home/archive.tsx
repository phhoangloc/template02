import React from 'react'
import Header from './header'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {
    genre: string
    data: any[]
}

const Archive = ({ data, genre }: Props) => {
    const toPage = useRouter()
    return (
        <div className='min-h-screen bg-slate-50 '>
            <Header />
            <div className='max-w-[1200px] m-auto py-24'>
                <div className='text-3xl font-bold mb-12 mx-4'>
                    <div>{genre}</div>
                </div>
                <div className='w-full flex flex-wrap ' >
                    {data.length ? data.map((d, index) =>
                        <div key={index} className='flex flex-col justify-end w-full sm:w-1/2 md:w-1/3 cursor-pointer  ' >
                            <div className=' rounded select-none  overflow-hidden m-4 ' onClick={() => { toPage.push("/" + d.archive + "/" + d.slug) }}>
                                <div className=' overflow-hidden flex flex-col justify-center text-center m-auto relative border'>
                                    {d.cover ?
                                        <Image className={`!select-none m-auto !w-full transition-all duration-300 hover:scale-105`} alt='img' width={500} height={500} src={process.env.ftp_url + d.cover.name} />
                                        : <div className='aspect-square flex flex-col justify-center'>NO IMAGE</div>}
                                </div>
                                <div className='p-4'>
                                    <p className='overflow-hidden truncate font-bold' title={d.name}>{d.name}</p>
                                    <p className='opacity-75 text-sm'>{d.archive}</p>
                                </div>
                            </div>
                        </div>) :
                        <div> NO DATA</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Archive