'use client'
import React from 'react'
import NotFound from '../not-found'
import Login from '@/component/login'
import Signup from '@/component/signup'
import Profile from '@/app/admin/page'

type Props = {
    params: {
        namePage: String
    }
}

const Page = ({ params }: Props) => {
    switch (params.namePage) {
        case "login":
            return <div className='center height-100vh textAlignCenter'>
                <Login />
            </div>
        case "signup":
            return <div className='center height-100vh textAlignCenter'>
                <Signup />
            </div>
        default:
            return <NotFound />
    }
}

export default Page