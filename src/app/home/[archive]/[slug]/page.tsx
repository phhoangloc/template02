import NotFound from '@/app/not-found'
import React from 'react'
import Detail from '@/component/home/detail'

type Props = {
    params: { archive: string, slug: string }
}

const Slug = ({ params }: Props) => {
    switch (params.archive) {
        case "book":
            return <Detail params={params} />
        case "blog":
            return <Detail params={params} />
        default:
            return <NotFound />
    }
}

export default Slug