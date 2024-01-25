
import React from 'react'
import "../../style/home.css"
type Props = {
    children: React.ReactNode,
    params: {
        namePage: string
    }
}

export async function generateMetadata({ params }: Props) {
    const capitalizeFirstLetter = (inputString: string) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    return {
        title: capitalizeFirstLetter(params.namePage),
    }
}

const layout = ({ children }: Props) => {

    return (
        <main className='home_layout'>
            {children}
        </main>
    )

}

export default layout