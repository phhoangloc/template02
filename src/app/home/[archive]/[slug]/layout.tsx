import React from 'react'
type Props = {
    params: { slug: string }
    children: React.ReactNode
}

export async function generateMetadata({ params }: Props) {
    const capitalizeFirstLetter = (inputString: string) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    return {
        template: '%s | Lockheart',
        title: capitalizeFirstLetter(params.slug),
    }
}


const layout = ({ children }: Props) => {
    return (
        <div>{children}</div>
    )
}

export default layout