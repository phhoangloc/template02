import NotFound from '@/app/not-found'
import React from 'react'
import Message from '@/component/home/message'
import Profile from '@/component/home/profile'
type Props = {
    params: { archive: string }
}

const Archive = ({ params }: Props) => {

    switch (params.archive) {
        case "message":
            return (<Message />)
        case "profile":
            return (<Profile />)
        default:
            return (<NotFound />)
    }
}

export default Archive