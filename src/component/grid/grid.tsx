import React from 'react'

type Props = {
    className?: string
    children?: React.ReactNode,
    style?: React.CSSProperties
}

const Grid = ({ className, children, style }: Props) => {
    return (
        <div className={`grid_box ${className}`} style={style}>
            {children}
        </div>
    )
}

export default Grid