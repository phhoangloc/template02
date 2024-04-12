'use client'
import React, { useState } from 'react'
import { Cherry_Bomb_One } from 'next/font/google'
import Box from '../grid/box'

const cherry = Cherry_Bomb_One({ subsets: ["latin"], weight: "400" })
const Clock = () => {

    const [hours, setHours] = useState<String>("")
    const [minutes, setMinutes] = useState<String>("")
    const [seconds, setSeconds] = useState<String>("")

    function updateClock() {
        const now = new Date();
        setHours(now.getHours().toString().padStart(2, "0"))
        setMinutes(now.getMinutes().toString().padStart(2, "0"))
        setSeconds(now.getSeconds().toString().padStart(2, "0"))
    }

    setInterval(() => {
        updateClock()
    }, 1000)

    return (
        hours && minutes ?
            <Box style={{ width: "max-content", margin: "0px auto 0px", fontSize: "11vw", letterSpacing: "2.5px" }}>{hours}:{minutes} </Box> :
            null
    )
}

export default Clock