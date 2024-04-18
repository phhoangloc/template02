import React from "react"

export type DivType = {
    className?: string
    children?: React.ReactNode,
    style?: React.CSSProperties
    onClick?: () => void
}

export type BoxDangerousType = {
    detail?: string
    style?: React.CSSProperties
}