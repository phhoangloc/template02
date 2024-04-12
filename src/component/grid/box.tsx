'use client'
import React from 'react'
import { DivType } from '@/type/divType'

const Box = ({ className, style, children, onClick }: DivType) => {
    return (
        <div className={`box ${className ? className : ""}`} style={style} onClick={() => onClick && onClick()}>{children}</div>
    )
}

export default Box