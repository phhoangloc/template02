import React from 'react'
import { DivType } from '@/type/divType'

const GridChild = ({ className, style, children }: DivType) => {
    return (
        <div className={`grid_child ${className}`} style={style}>
            {children}
        </div>
    )
}

export default GridChild