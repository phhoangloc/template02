import ArchiveMain from '@/component/asset/admin/archiveMain'
import Header from '@/component/asset/admin/header'
import Menu from '@/component/asset/admin/menu'
import Box from '@/component/grid/box'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <Box>
            < Header />
            <Box style={{ display: "flex", width: "max-content" }}>
                <Menu />
                <ArchiveMain>
                    {children}
                </ArchiveMain>
            </Box>
        </Box >
    )
}

export default layout