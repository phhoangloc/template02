'user client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import Box from '../grid/box';
import { UserAuthen } from '@/axios/UserAuthen';
import store from '@/redux/store';
import Button from '../input/button';
import UploadButton from '../input/uploadButton';
type Props = {
    open?: boolean,
    close?: () => void
    select?: (e: any) => void
}

const PictureModal = ({ open, close, select }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })


    const [refresh, setRefresh] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const position = currentUser?.position

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            // create && create(reader.result, file)
            setLoading(true)
            const result = position && await UserAuthen.uploadFile(position, file, "pic")
            if (result) {
                setLoading(false)
                setRefresh(n => n + 1)
            }
        }
    }

    const [data, setData] = useState<any>([])

    const getPhoto = async (p: string, archive: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, "", skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        position && getPhoto(position, "pic", 0, 0)
    }, [refresh, position])

    const modalStyle: React.CSSProperties = {
        display: "block",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backdropFilter: "brightness(0.25) blur(1px)",
        padding: "5px",
        overflow: "auto"
    }

    return (
        <Box className='scroll' style={open ? modalStyle : { display: "none" }}>
            <CloseIcon onClick={() => close && close()} style={{ position: "absolute", right: "5px", top: "5px", zIndex: 2 }} />
            <UploadButton icon={loading ? "..." : "add Image"} func={(e) => getFile(e)} />
            <Box className='grid_box '>
                {
                    data?.map((item: any, index: any) =>
                        <Box
                            className='xs4 sm4 md3 lg2 borderBox'
                            key={index}
                            style={{ height: "max-content", borderRadius: "5px", cursor: "pointer", margin: "10px" }}
                            onClick={() => select && select(item)}>
                            <Box style={{ aspectRatio: 1, position: "relative", overflow: "hidden", textAlign: "center" }}>
                                <Image src={process.env.google_url + item.name} width={500} height={500} alt='pic' style={{ width: "auto", height: "100%" }} priority={true} />
                            </Box>

                        </Box>
                    )

                }
            </Box>
        </Box>
    )
}

export default PictureModal