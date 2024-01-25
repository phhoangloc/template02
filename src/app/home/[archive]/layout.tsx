import React from 'react'
type Props = {
    params: { archive: string }
    children: React.ReactNode
}

export async function generateMetadata({ params }: Props) {
    const capitalizeFirstLetter = (inputString: string) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    return {
        title: capitalizeFirstLetter(params.archive),
    }
}


const layout = ({ children }: Props) => {
    return (
        <div>{children}</div>
    )
}

export default layout