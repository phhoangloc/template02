import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Box from '../grid/box';
import SearchIcon from '@mui/icons-material/Search';
import Input from '../input/input';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import store from '@/redux/store';
type Props = {
    add?: () => void
    onSearch: (s: string) => void,
    upLoadFile?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    getEdit?: (e: boolean) => void,
    deleteItems?: number
    onDelete?: () => void
}

const Tool = ({ add, onSearch, upLoadFile, getEdit, deleteItems, onDelete }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })


    const IconRef: any = useRef()

    const [edit, setEdit] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [searchInput, setSearchInput] = useState<boolean>(false)

    useEffect(() => {
        onSearch(search)
    }, [search])

    useEffect(() => {
        getEdit && getEdit(edit)
    }, [edit])

    return (
        <Box style={{ display: "flex", borderRadius: "5px" }} className={`${currentTheme ? "background_light" : "background_dark"} boxShadow`}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => upLoadFile && upLoadFile(e)} multiple={true} />
            <Box className={``} style={{ height: "40px", margin: "auto 5px", borderRadius: "5px" }}>
                <AddIcon onClick={() => { add ? add() : IconRef.current && IconRef.current.click() }} style={{ width: "30px", height: "30px", margin: "5px" }} />
            </Box>
            <Box style={{ width: searchInput ? "200px" : "0px", transition: "all 0.5s", overflow: "hidden", borderRadius: "5px" }}>
                <Input name="search" value={search} onChange={(e) => setSearch(e)} />
            </Box>
            <Box className={``} style={{ height: "40px", margin: "auto 5px", borderRadius: "5px" }}>
                {searchInput ?
                    <CloseIcon onClick={() => { setSearch(""), setSearchInput(false) }} style={{ width: "30px", height: "30px", margin: "5px" }} /> :
                    <SearchIcon onClick={() => setSearchInput(!searchInput)} style={{ width: "30px", height: "30px", margin: "5px" }} />}
            </Box>
            <Box className={``} style={{ height: "40px", margin: "auto 5px", borderRadius: "5px" }}>
                {deleteItems ?
                    <DeleteIcon style={{ width: "30px", height: "30px", margin: "5px" }} onClick={() => onDelete && onDelete()} /> :
                    null}
                {edit ?
                    <CloseIcon style={{ width: "30px", height: "30px", margin: "5px" }} onClick={() => setEdit(false)} /> :
                    <EditIcon style={{ width: "30px", height: "30px", margin: "5px" }} onClick={() => setEdit(true)} />}
            </Box>
        </Box>
    )
}

export default Tool