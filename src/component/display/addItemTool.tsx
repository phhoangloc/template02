import React, { useEffect, useState } from 'react'
import Grid from '../grid/grid'
import GridChild from '../grid/gridChild'
import Input from '../input/input'
import Box from '../grid/box'
import UploadButton from '../input/uploadButton'
import { AttachFile } from '@mui/icons-material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import store from '@/redux/store'
import { UserAuthen } from '@/axios/UserAuthen'
import CheckIcon from '@mui/icons-material/Check';
import Remove from '@mui/icons-material/Remove'
type Props = {
    inputName: string,
    inputAudio?: any,
    edit: boolean,
    onfocus?: () => void
    onChange?: (data: any) => void
    addMoreItem?: (data: any) => void
    editItem?: (data: any) => void
    removeItem?: () => void
    value?: string
}

const AddItemTool = ({ inputName, inputAudio, edit, onfocus, onChange, addMoreItem, editItem, removeItem, value }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [text, setText] = useState<string>("")
    const [audio, setAudio] = useState<any>()
    const [audioName, setAudioName] = useState<any>("")

    const [onLoad, setOnload] = useState<boolean>(false)
    const [onAllChange, setOnAllChange] = useState<boolean>(false)

    const getFile = async (e: any, type: string) => {
        setOnload(true)
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const result = currentUser.position && await UserAuthen.uploadFile(currentUser.position, file, type)
            if (result) {
                setAudio(result)
                setOnload(false)
            }
        }
    }

    useEffect(() => {
        onChange && onChange({ text: text || value, audio: audio || inputAudio })
        if (text && text !== value || audio && audio._id !== inputAudio?._id) {
            setOnAllChange(true)
        } else {
            setOnAllChange(false)
        }
    }, [text, audio])

    return (
        <Grid>
            <GridChild className='xs12 sm6'>
                <Input name={inputName} onChange={(v) => setText(v)} value={text || value || ""} onfocus={() => onfocus && onfocus()} />
            </GridChild>
            {edit ?
                <GridChild className='xs12 sm6' style={{ display: "flex" }}>
                    {
                        value ? <Box className='center' style={{ margin: "0 5px" }}>
                            <UploadButton icon={onLoad ? null : <AttachFileIcon style={{ width: "100%", height: "100%" }} />} size={30} func={(e) => { onfocus && onfocus(), getFile(e, "file") }} />
                        </Box> : null
                    }


                    <Box className='center' style={{ width: "max-content", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>{audio?.name || inputAudio?.name}</Box>
                    <Box className='center' style={{ margin: "auto 0px", flexDirection: "row" }}>
                        {value ?
                            <>
                                {onAllChange ?
                                    <CheckIcon className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }}
                                        onClick={() => { editItem && editItem({ text: text || value, audio: audio || inputAudio }) }} /> : null}
                                <Remove className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }}
                                    onClick={() => { removeItem && removeItem() }} /></>
                            : addMoreItem ?
                                <AddIcon className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }}
                                    onClick={() => { text && addMoreItem && addMoreItem({ text: text || value, audio: audio || inputAudio }), setText(""), setAudio("") }} /> :
                                null}

                    </Box>
                </GridChild> : null}
        </Grid>
    )
}

export default AddItemTool