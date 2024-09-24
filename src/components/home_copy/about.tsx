import React from 'react'

type Props = {}

const About = (props: Props) => {
    return (
        <div className='bg-slate-200 text-center'>
            <div className='max-w-[1200px] min-h-screen m-auto py-4 flex flex-col justify-center'>
                <div className='text-2xl mb-10 font-bold'>Welcome to LOCAND!</div>
                <div className='text-lg'>Are you looking for beautifully designed templates to kickstart your web projects? Look no further! <br></br>
                    We offer a wide range of customizable web templates, perfect for developers and designers alike. <br></br>
                    Whether you're working on a personal blog, an e-commerce site, or a portfolio, our templates are crafted to meet your needs.  <br></br>
                    Save time and focus on what you do best—creating amazing web experiences. Start building your dream website with ease today!</div>
            </div>
        </div>
    )
}

export default About