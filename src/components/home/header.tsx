import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './menu';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
type Props = {}

const Header = (props: Props) => {
    return (
        <>
            <div className='fixed w-full opacity-25 hover:opacity-100 transition-all duration-200 '>
                <div className='flex justify-between max-w-[1200px] h-12 m-auto'>
                    <p className='text-2xl font-bold h-full flex flex-col justify-center cursor-pointer'>LOCAND</p>
                    <div>
                        <MenuIcon className='!w-12 !h-12 p-2 cursor-pointer' onClick={() => store.dispatch(setMenu(true))} />
                    </div>
                </div>
            </div>
            <Menu />
        </>
    )
}

export default Header