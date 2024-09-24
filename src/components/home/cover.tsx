import React from 'react'
import Image from 'next/image'
import Button from '../tool/input/button'
type Props = {}

const Cover = (props: Props) => {
    return (
        <div className='flex flex-row-reverse justify-center py-20'>
            <div className="w-full max-w-[600px] border-b-2 border-orange-500">
                <Image src="/img/cover.png" className='w-full h-auto m-auto ' width={500} height={500} alt="cover" />
            </div>
            <div className="w-full flex flex-col justify-end max-w-[600px]">
                <p className='text-4xl font-bold text-orange-500 mb-0'>one click</p>
                <p className='text-2xl mb-10'>to make your website</p>
                <div className="w-max mb-10 flex">
                    <Button onClick={() => console.log("start")} name="Start" sx='!mx-1 my-4' />
                    <Button onClick={() => console.log("docs")} name="Doc" sx='!mx-1 my-4' />
                </div>
            </div>
        </div>)
}

export default Cover