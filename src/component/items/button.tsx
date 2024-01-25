import React from 'react'
import './style.css'
type Props = {
    onClick: () => void,
    name: string,
    disable?: boolean
}

const Button = ({ onClick, name, disable }: Props) => {
    return (
        <div className='button'>
            <button disabled={disable ? disable : false} onClick={() => onClick()}>{name}</button>
        </div>
    )
}

export default Button