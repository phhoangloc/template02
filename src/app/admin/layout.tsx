import ArchiveMain from '@/component/asset/admin/archiveMain'
import Header from '@/component/asset/admin/header'
import Menu from '@/component/asset/admin/menu'
import Box from '@/component/grid/box'
import React from 'react'
import { Metadata } from 'next'
type Props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: {
        template: '%s | Admin ',
        default: 'Admin', // a default is required when creating a template
    },
    icons: {
        icon: '/img/icon.png',
    }
}

const layout = ({ children }: Props) => {
    return (
        <Box>
            < Header />
            <Box style={{ display: "flex", width: "max-content", maxWidth: "100%" }}>
                <Menu />
                <ArchiveMain>
                    {children}
                </ArchiveMain>
            </Box>
        </Box >
    )
}

export default layout