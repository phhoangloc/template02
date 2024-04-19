import React from 'react'
import { DivType } from '@/type/divType'

const GridChild = ({ className, style, children, onClick }: DivType) => {
    return (
        <div className={`grid_child ${className}`} style={style} onClick={() => onClick && onClick()}>
            {children}
        </div>
    )
}

export default GridChild