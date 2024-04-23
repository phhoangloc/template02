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
import { setPlayer } from '@/redux/reducer/playerReducer'
import { vocabularyType } from '@/type/vocabularyType'
import AddItemTool from './addItemTool'

type Props = {
    lesson: any,
    edit?: boolean,
    updateLesson?: (data: any) => void
}

const SingleLessonView = ({ lesson, edit, updateLesson }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [i, setI] = useState<number>(-1)
    const [vocaId, setvocaId] = useState<string>("")
    const [m, setM] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [word, setWord] = useState<{ text: string; audio: string } | {}>({})
    const [wordText, setWordText] = useState<string>("")
    const [explain, setExplain] = useState<{ text: string; audio: string }[]>([])
    const [wordExplain, setWordExplain] = useState<string>("")
    const [example, setExample] = useState<{ text: string; audio: string }[]>([])
    const [wordExample, setWordExample] = useState<string>("")
    const [file, setFile] = useState<any>()
    const [fileExplain, setFileExplain] = useState<any>()
    const [fileExample, setFileExample] = useState<any>()
    const [vocabulary, setvocabulary] = useState<any>([])

    const body = {
        lesson: lesson._id,
        word,
        explain,
        example,
    }

    useEffect(() => {
        lesson?.name ? setName(lesson.name) : null
        lesson?.slug ? setSlug(lesson.slug) : null
        lesson?.detail ? setDetail(lesson.detail) : null
        lesson?.vocabulary ? setvocabulary(lesson.vocabulary) : null
    }, [lesson])

    const saveVocabulary = async (p: string, a: string, id: string, body: any) => {
        const result = await UserAuthen.updateItem(p, a, id, body)
        if (result.success) {
            store.dispatch(setRefresh())
        }
    }

    const createVocabulary = async (p: string, a: string, body: any,) => {
        const result = await UserAuthen.createItem(p, a, body)
        if (result.success) {
            store.dispatch(setRefresh())
        }

    }

    const deleteVocabulary = async (p: string, a: string, i: string) => {
        const result = await UserAuthen.deleteItem(p, a, i)
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
    const getFileExplain = async (e: any, type: string) => {
        var files = e.target.files;
        const file: File = files[0]

        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            const result = currentUser.position && await UserAuthen.uploadFile(currentUser.position, file, type)
            setFileExplain(result)
        }
    }

    useEffect(() => {
        if (vocaId) {
            setWord(vocabulary.filter((item: any) => item._id.toString() === vocaId)[0].word || {})
            setExplain(vocabulary.filter((item: any) => item._id.toString() === vocaId)[0].explain || [])
            setExample(vocabulary.filter((item: any) => item._id.toString() === vocaId)[0].example || [])
        } else {
            setWord({})
            setExplain([])
            setExample([])
        }
    }, [vocaId])

    useEffect(() => {
        updateLesson && updateLesson({ name, slug, detail, vocabulary })
    }, [name, slug, detail, vocabulary])

    return (
        edit ?
            <Box className={`detailBox xs12 `} style={{ maxWidth: "768px", margin: "auto" }}>
                <Box className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                    style={{ padding: "10px", borderRadius: "5px", margin: "10px 0" }}>
                    <Input name="Lession 01" value={name} onChange={(e) => setName(e)} />
                    <Input name="slug" value={slug} onChange={(e) => setSlug(e)} />
                    <TextAreaTool name='' onChange={(e) => setDetail(e)} value={detail} />

                </Box>
                <Box className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                    style={{ padding: "10px", borderRadius: "5px" }}>

                    <h2>vocabulary</h2>
                    {
                        vocabulary?.map((voca: any, index: number) =>
                            <Grid className='borderBox' style={{ margin: "5px" }} key={index}>
                                <AddItemTool inputName='word'
                                    edit={vocaId === voca._id}
                                    onfocus={() => { setvocaId(voca._id) }}
                                    onChange={(data) => { setWord({ text: data.text, audio: data.audio?._id }) }}
                                    value={voca?.word?.text}
                                    inputAudio={voca.word.audio}
                                    removeItem={() => { deleteVocabulary(currentUser.position, "vocabulary", vocaId) }}
                                />
                                {vocaId === voca._id ?
                                    <>
                                        {
                                            explain.map((exp: any, indexExp: number) =>
                                                <AddItemTool inputName='explain' key={indexExp}
                                                    value={exp.text}
                                                    edit={true}
                                                    onfocus={() => { setvocaId(voca._id) }}
                                                    addMoreItem={(data) => { setExplain(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}
                                                    inputAudio={exp.audio}
                                                    editItem={(data) => {
                                                        const newExp = explain
                                                        newExp[indexExp] = { text: data.text, audio: data.audio?._id }
                                                        setExplain(newExp)
                                                    }}
                                                    removeItem={() => { setExplain(exp => exp.filter((item, ind) => ind !== indexExp)) }}
                                                />
                                            )
                                        }
                                        <AddItemTool inputName='new explain'
                                            edit={true} onfocus={() => { setvocaId(voca._id) }}
                                            addMoreItem={(data) => { setExplain(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}
                                        />
                                        {
                                            example.map((exp: any, indexExa: number) =>
                                                <AddItemTool inputName='example' key={indexExa}
                                                    value={exp.text}
                                                    edit={true} onfocus={() => { setvocaId(voca._id) }}
                                                    addMoreItem={(data) => { setExample(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}
                                                    inputAudio={exp.audio}
                                                    editItem={(data) => {
                                                        const newExa = example
                                                        newExa[indexExa] = { text: data.text, audio: data.audio?._id }
                                                        setExample(newExa)
                                                    }}
                                                    removeItem={() => { setExample(exp => exp.filter((item, ind) => ind !== indexExa)) }}
                                                />
                                            )
                                        }
                                        <AddItemTool inputName='new example'
                                            edit={true} onfocus={() => { setvocaId(voca._id) }}
                                            addMoreItem={(data) => { setExample(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}

                                        />
                                    </>
                                    : null
                                }

                                {
                                    vocaId && <Box style={{ display: "flex" }}>
                                        <GridChild><Button name="save" onClick={() => { saveVocabulary(currentUser.position, "vocabulary", vocaId, body) }} /></GridChild>
                                    </Box>
                                }

                            </Grid>
                        )
                    }
                    <Grid className='borderBox' style={{ margin: "5px" }}>
                        <GridChild><h3>new vocabulary</h3></GridChild>
                        <AddItemTool inputName='new word'
                            edit={true} onfocus={() => { setvocaId("") }}
                            onChange={(data) => { setWord(data) }}
                        />
                        {
                            vocaId === "" && explain.map((exp, index) =>
                                <AddItemTool inputName='new explain' key={index}
                                    value={exp.text}
                                    edit={i === vocabulary.length} onfocus={() => { setI(vocabulary.length) }}
                                    addMoreItem={(data) => { setExplain(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}
                                    removeItem={() => { setExplain(exp => exp.filter((item, ind) => ind !== ind)) }}
                                />
                            )
                        }
                        <AddItemTool inputName='new explain'
                            edit={true} onfocus={() => { setvocaId("") }}
                            addMoreItem={(data) => { setExplain(exp => [...exp, data]) }}
                        />
                        {
                            vocaId === "" && example.map((exp, index) =>
                                <AddItemTool inputName='new explain' key={index}
                                    value={exp.text}
                                    edit={i === vocabulary.length} onfocus={() => { setI(vocabulary.length) }}
                                    addMoreItem={(data) => { setExample(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}
                                    removeItem={() => { setExample(exp => exp.filter((item, ind) => ind !== ind)) }}
                                />
                            )
                        }
                        <AddItemTool inputName='new example'
                            edit={true} onfocus={() => { setvocaId("") }}
                            addMoreItem={(data) => { setExample(exp => [...exp, { text: data.text, audio: data.audio?._id }]) }}
                        />
                        <GridChild className='xs12'><Button name="add" onClick={() => createVocabulary(currentUser.position, "vocabulary", body)} /></GridChild>
                    </Grid>


                </Box>
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
                            <Box key={index} className={`borderBox boxShadow`} style={{ margin: "10px", borderRadius: "5px", padding: "10px" }}>
                                <h3>
                                    <span style={{ fontSize: "0.9rem", fontWeight: "normal", opacity: "0.75" }}>
                                        {index + 1}.
                                    </span>
                                    {voca?.word?.text}
                                    <CampaignIcon style={{ width: "1rem", height: "1rem", marginLeft: "5px" }} onClick={() => store.dispatch(setPlayer({ src: process.env.ftp_url + "file/" + voca.word.audio.name }))} />
                                </h3>
                                {voca?.explain?.map((exp: any, ind: number) =>
                                    <p key={ind}>
                                        <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>exp:</span>{exp?.text}
                                        <CampaignIcon style={{ width: "1rem", height: "1rem", marginLeft: "5px" }} onClick={() => store.dispatch(setPlayer({ src: process.env.ftp_url + "file/" + exp.audio?.name }))} />
                                    </p>
                                )}
                                {voca?.example?.map((exa: any, ind: number) =>
                                    <p key={ind}>
                                        <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>exa:</span>{exa?.text}
                                        <CampaignIcon style={{ width: "1rem", height: "1rem", marginLeft: "5px" }} onClick={() => store.dispatch(setPlayer({ src: process.env.ftp_url + "file/" + exa.audio?.name }))} />
                                    </p>
                                )}
                            </Box>)
                            : null
                    }

                </Box>

            </Box>
    )
}

export default SingleLessonView