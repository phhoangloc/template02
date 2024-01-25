
import Header from '@/component/home/header'
import React from 'react'
import "../../style/home.css"

import Menu from '@/component/home/menu'
import { Metadata } from 'next'
import SocketProvider from '@/provider/socketProvider'
export const metadata: Metadata = {
    title: {
        template: '%s | Lockheart',
        default: 'Home', // a default is required when creating a template
    },
}

type Props = {
    children: React.ReactNode,
}

const layout = ({ children }: Props) => {
    return (
        <div className='home_layout'>
            <SocketProvider>
                <Menu />
                <Header />
                {children}
            </SocketProvider>
        </div>
    )
}

export default layout