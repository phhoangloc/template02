'use client'
import React from 'react'
import NotFound from '../not-found'
import Login from '@/component/home/login'
import Signup from '@/component/home/signup'

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
        case "profile":
            return <div className='center height-100vh textAlignCenter'>
                <h1>Profile</h1>
            </div>
        default:
            return <NotFound />
    }
}

export default Page