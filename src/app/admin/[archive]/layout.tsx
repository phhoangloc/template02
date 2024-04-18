import React from 'react'
import { Metadata } from 'next'
type Props = {
    children: React.ReactNode,
    params: {
        archive: string
    }
}
export async function generateMetadata({ params }: Props) {

    const capitalizeFirstLetter = (inputString: string) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    return {
        title: {
            template: '%s | Admin ',
            default: capitalizeFirstLetter(params.archive),
        },
        icons: {
            icon: 'icon/icon.png',
        }
    }
}

const layout = ({ children }: Props) => {
    return children
}

export default layout