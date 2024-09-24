import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
type Props = {}

const Header = (props: Props) => {
    return (
        <div className='bg-slate-100'>
            <div className='flex justify-between max-w-[1200px] h-12 m-auto'>
                <p className='text-2xl font-bold h-full flex flex-col justify-center'>Logo</p>
                <div>
                    <MenuIcon className='!w-12 !h-12 p-2' />
                </div>
            </div>
        </div>
    )
}

export default Header