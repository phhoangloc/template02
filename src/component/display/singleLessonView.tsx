'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import Button from '../input/button'
import Input from '../input/input'
import TextAreaTool from '../input/textareaTool'
import { UserAuthen } from '@/axios/UserAuthen'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import Box from '../grid/box'
import BoxDangerous from '../grid/boxDangerous'
import CampaignIcon from '@mui/icons-material/Campaign';
import Grid from '../grid/grid'
import GridChild from '../grid/gridChild'
import UploadButton from '../input/uploadButton'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
type Props = {
    lesson: any,
    edit?: boolean
}

const SingleLessonView = ({ lesson, edit }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [i, setI] = useState<number>(-1)
    const [name, setName] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [word, setWord] = useState<string>("")
    const [file, setFile] = useState<any>()
    const [script, setScript] = useState<string>("")

    const [vocabulary, setvocabulary] = useState<any>([])

    const body = {
        name, slug, detail, vocabulary
    }
    useEffect(() => {
        lesson?.name ? setName(lesson.name) : null
        lesson?.slug ? setSlug(lesson.slug) : null
        lesson?.detail ? setDetail(lesson.detail) : null
        lesson?.vocabulary ? setvocabulary(lesson.vocabulary) : null
    }, [lesson])


    const saveVocabulary = (i: number, word: string, file: any) => {
        const newVocabulary = vocabulary.slice()
        newVocabulary[i] = { word, file: file && file._id }
        if (word) {
            setvocabulary(newVocabulary)
        }
        setWord("")
        setFile(undefined)
        setI(-1)

    }
    const deleteVocabulary = (i: number, word: string, script: string) => {
        var newVocabulary = vocabulary.slice()
        newVocabulary = newVocabulary.filter((item: any, index: number) => index != i)
        setvocabulary(newVocabulary)
        setWord("")
        setFile(undefined)
        setI(-1)
    }
    const updateLesson = async (p: string, id: string, body: any) => {
        const result = await UserAuthen.updateLesson(p, id, body)
        if (result.success) {
            store.dispatch(setRefresh())
        }
    }
    const getFile = async (e: any, type: string) => {
        var files = e.target.files;
        const file: File = files[0]

        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const result = currentUser.position && await UserAuthen.uploadFile(currentUser.position, file, type)
            setFile(result)
        }
    }

    useEffect(() => {
        vocabulary[i] && setWord(vocabulary[i]?.word)
    }, [i])
    return (
        edit ?
            <Box className={`detailBox xs12 `} style={{ maxWidth: "768px", margin: "auto" }}>
                <Box
                    className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                    style={{ padding: "10px", borderRadius: "5px" }}
                >
                    <Input name="Lession 01" value={name} onChange={(e) => setName(e)} />
                    <Input name="slug" value={slug} onChange={(e) => setSlug(e)} />
                    <TextAreaTool name='' onChange={(e) => setDetail(e)} value={detail} />

                </Box>
                <Box className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                    style={{ padding: "10px", borderRadius: "5px" }}>
                    <Box>
                        <h2>vocabulary</h2>
                        {vocabulary?.map((item: any, index: number) =>
                            <Grid key={index}>
                                <GridChild className='xs12 sm6'>
                                    <Input name="word" onChange={(e) => setWord(e)} value={i !== index ? item.word : word} disabled={i !== index} />
                                </GridChild>
                                <GridChild className='xs12 sm6' style={{ display: "flex" }}>
                                    <Box className='center' style={{ margin: "0 5px" }}>
                                        <UploadButton icon={<AttachFileIcon style={{ width: "100%", height: "100%" }} />} size={30} func={(e) => { getFile(e, "file") }} /></Box>
                                    <Box className='center'>{file && file.name}</Box>
                                    <Box className='center' style={{ margin: "auto 0px", flexDirection: "row" }}>
                                        {i !== index ? <EditIcon className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }} onClick={() => setI(index)} /> :
                                            <>
                                                <CheckIcon className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }} onClick={() => saveVocabulary(i, word, file)} />
                                                <RemoveIcon className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }} onClick={() => deleteVocabulary(i, word, file)} />
                                            </>}
                                    </Box>
                                </GridChild>
                            </Grid>

                        )}
                        <Grid>
                            <GridChild className='xs12 sm6'>
                                <Input name="word" onChange={(e) => setWord(e)} value={i !== vocabulary.length ? "" : word} onfocus={() => setI(vocabulary.length)} />
                            </GridChild>
                            <GridChild className='xs12 sm6' style={{ display: "flex" }}>
                                <Box className='center' style={{ margin: "0 5px" }}>
                                    <UploadButton icon={<AttachFileIcon style={{ width: "100%", height: "100%" }} />} size={30} func={(e) => { setI(vocabulary.length), getFile(e, "file") }} /></Box>
                                <Box className='center'>{file && file.name}</Box>
                                <Box className='center' style={{ margin: "auto 0px", flexDirection: "row" }}>
                                    <AddIcon className='borderBox' style={{ width: "30px", height: "30px", borderRadius: "5px", margin: "0 5px" }} onClick={() => saveVocabulary(i, word, file)} />
                                </Box>
                            </GridChild>
                        </Grid>
                    </Box>

                </Box>
                <Box><h4>listen</h4></Box>
            </Box> :
            <Box className='grid_box scrollNone'>
                <Box className={`detailBox xs12 ${currentTheme ? "background_light" : "background_dark"} boxShadow`}
                    style={{ maxWidth: "768px", margin: "0 auto 15px", borderRadius: "5px", padding: "10px" }}>
                    <Box>
                        <h2 style={{ width: "100%" }}>{lesson?.name}</h2>
                    </Box>
                    <Box>
                        <BoxDangerous detail={lesson.detail} style={{ minHeight: "100px" }} />
                    </Box>
                </Box>
                <Box className={`detailBox xs12 ${currentTheme ? "background_light" : "background_dark"} boxShadow`}
                    style={{ maxWidth: "768px", margin: "0 auto 15px", borderRadius: "5px", overflow: "hidden" }}>
                    <Box className={currentTheme ? "background_white" : "background_black"} style={{ padding: "10px" }}>
                        <h3>vocabulary</h3>
                    </Box>
                    {
                        lesson?.vocabulary ? lesson?.vocabulary.map((voca: any, index: number) =>
                            <Box className={`borderBox boxShadow`} style={{ margin: "10px", borderRadius: "5px", padding: "10px" }}>
                                <h3><span style={{ fontSize: "0.9rem", fontWeight: "normal", opacity: "0.75" }}>{index + 1}. </span>{voca.word} <CampaignIcon style={{ width: "0.9rem", height: "0.9rem" }} /></h3>
                                <div dangerouslySetInnerHTML={{ __html: voca.script }} style={{ margin: "5px 0 0", minHeight: "100px", fontSize: "calc(0.8rem + 5%)" }} />
                            </Box>)
                            : null
                    }

                </Box>
                <Box className={`detailBox xs12 ${currentTheme ? "background_light" : "background_dark"}`}
                    style={{ maxWidth: "768px", margin: "0 auto 15px", borderRadius: "5px" }}>
                    <h2>listen</h2>
                    {
                        lesson?.listen ? lesson?.listen.map((listen: any, index: number) =>
                            <Box key={index}>{listen.word}</Box>)
                            : null
                    }

                </Box>

            </Box>
    )
}

export default SingleLessonView