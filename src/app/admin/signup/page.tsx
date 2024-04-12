"use client"
import Signup from '@/component/auth/signup'

import React from 'react'
import Box from '@/component/grid/box'

const page = () => {
    return (
        <Box className="center" style={{ height: "calc(100vh - 50px)" }}>
            <Signup archive='admin' />
        </Box>
    )
}

export default page