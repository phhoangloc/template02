import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Box from '../grid/box';
import SearchIcon from '@mui/icons-material/Search';
import Input from '../input/input';
type Props = {
    add?: () => void
    onSearch: (s: string) => void,
    upLoadFile?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Tool = ({ add, onSearch, upLoadFile }: Props) => {

    const IconRef: any = useRef()
    const [search, setSearch] = useState<string>("")
    const [searchInput, setSearchInput] = useState<boolean>(false)

    useEffect(() => {
        onSearch(search)
    }, [search])

    return (
        <Box style={{ display: "flex" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => upLoadFile && upLoadFile(e)} multiple={true} />
            <Box>
                <AddIcon onClick={() => { add ? add() : IconRef.current && IconRef.current.click() }} style={{ width: "30px", height: "30px", margin: "20px 5px" }} />
            </Box>
            <Box style={{ width: searchInput ? "200px" : "0px", transition: "all 0.5s", overflow: "hidden" }}>
                <Input name="search" value={search} onChange={(e) => setSearch(e)} />
            </Box>
            <SearchIcon onClick={() => setSearchInput(!searchInput)} style={{ width: "30px", height: "30px", margin: "20px 5px" }} />
        </Box>
    )
}

export default Tool