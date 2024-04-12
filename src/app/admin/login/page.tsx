'use client'
import Login from '@/component/auth/login'
import React from 'react'
import Box from '@/component/grid/box'
const page = () => {
    return (
        <Box className="center" style={{ height: "calc(100vh - 50px)" }}>
            <Login archive="admin" />
        </Box>
    )
}

export default page