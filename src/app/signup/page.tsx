"use client"
import Signup from '@/component/auth/signup'

import React from 'react'
import Box from '@/component/grid/box'

const page = () => {
    return (
        <Box className="minHeight100vh center">
            <Signup archive='admin' />
        </Box>
    )
}

export default page