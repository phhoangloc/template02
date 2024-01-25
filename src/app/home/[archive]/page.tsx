import NotFound from '@/app/not-found'
import React from 'react'
import Message from '@/component/home/message'
type Props = {
    params: { archive: string }
}

const Archive = ({ params }: Props) => {

    switch (params.archive) {
        case "message":
            return (<Message />)
        default:
            return (<NotFound />)
    }
}

export default Archive