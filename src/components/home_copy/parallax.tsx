'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
type Props = {
    data?: any[]
}

const Parallax = ({ data }: Props) => {

    const parallax: any = useRef()
    const parallaxChild: any = useRef()

    const [hover, setHover] = useState<boolean>(false)
    const [i, setI] = useState<number>(-1)

    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)

    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
        parallax.current.scrollTop = scrollTop - ((e.pageY - startY))
    }

    useEffect(() => {
        parallaxChild.current?.clientWidth ? parallax.current.scrollLeft = `${(parallaxChild.current?.clientWidth - window.innerWidth) / 2}` : null
        parallaxChild.current?.clientHeight ? parallax.current.scrollTop = `${(parallaxChild.current?.clientHeight - window.innerHeight) / 2}` : null
    }, [parallaxChild.current?.clientWidth, parallaxChild.current?.clientHeight])

    const toPage = useRouter()

    return (
        <div ref={parallax}
            className='w-screen h-screen bg-slate-100 scroll-hidden overflow-auto py-4 cursor-grab active:cursor-grabbing'
            onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setStartY(e.pageY), setScrollTop(e.currentTarget.scrollTop), setScrollLeft(e.currentTarget.scrollLeft) }}
            onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
            onMouseUp={() => { setMountDown(false) }}
            onMouseLeave={() => setMountDown(false)}>
        </div>
    )

}

export default Parallax