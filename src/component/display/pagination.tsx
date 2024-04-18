import React from 'react'
import Box from '../grid/box'


type Props = {
    skip: number,
    sum: number,
    page: number,
    func: (e: number) => void,
    next: () => void,
    prev: () => void,
    end?: boolean
}

const Pagination = ({ skip, sum, page, func, next, prev, end }: Props) => {

    const boxStyle: React.CSSProperties = {
        width: "40px",
        height: "40px",
        cursor: "pointer",
        textAlign: "center"
    }
    return (
        <div style={{ display: "flex", width: "max-content", margin: "auto" }}>
            {page === 0 ?
                <Box style={boxStyle} /> :
                <Box style={boxStyle} onClick={() => prev()}>
                    pre
                </Box>}
            <Box style={boxStyle}>
                {page + 1}
            </Box>
            {sum < skip || end ? <Box style={boxStyle} /> :
                <Box style={boxStyle} onClick={() => next()}>
                    next
                </Box>}
        </div>
    )
}

export default Pagination