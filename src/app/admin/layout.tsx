
import Header from '@/component/home/header'
import React from 'react'
import "../../style/home.css"

import Menu from '@/component/home/menu'
import { Metadata } from 'next'
import SocketProvider from '@/provider/socketProvider'
import Footer from '@/component/home/footer'
export const metadata: Metadata = {
    title: {
        template: '%s | Admin',
        default: 'Admin', // a default is required when creating a template
    },
}

type Props = {
    children: React.ReactNode,
}

const layout = ({ children }: Props) => {
    return (
        <div className='home_layout center height-100vh textAlignCenter'>
            <SocketProvider>
                {children}
            </SocketProvider>
        </div>
    )
}

export default layout