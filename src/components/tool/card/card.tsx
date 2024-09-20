import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import store from '@/redux/store';
import { ChangePageType, setChangePage } from '@/redux/reducer/changPageReduce';
import moment from 'moment';
type PropsDetail = {
    data: any,
    scroll?: any
    sendChapter?: any,

}

export const ArchiveCard = ({ item, onClick }: { item: any, onClick?: (link: string) => void }) => {
    return (
        <div className='xs12 md6 lg4 pd-5px'>
            <div className=' w100p of-hidden br-5px'>
                <div className="grid_box bg pd-5p ">
                    <div className=' xs8 ps-re as-1 of-hidden br-5px ta-center '>
                        {item.cover?.name ?
                            <Image className='trss-1-4' src={process.env.ftp_url + "locand/" + item.cover?.name}
                                width={500}
                                height={500}
                                style={{
                                    height: "100%",
                                    width: "auto",
                                    zIndex: 0
                                }}
                                priority={true}
                                alt='cover' /> :
                            null
                        }
                    </div>
                    <div className='xs4 dp-flex fd-col jc-end'>
                        <p className='w-mc h-mc mg-0px-auto ta-center pd-5px bor-bottom-1px'>{moment(item.createDate).format('YYYY.MM.DD')}</p>
                    </div>
                </div>
                <div className=' pd-10px'>
                    <p className='mg-bottom-10px'>{item.genre}</p>
                    <h4 title={item.name} className=' mg-auto ta-left lh20px cl-main mg-bottom-5px'>{item.name}</h4>
                    <h4 title={item.name} className=' mg-auto ta-left lh20px cl-main mg-bottom-5px opa-50p'>{item.host.username}</h4>
                    <p className='bg w-mc h-mc mg-0px-auto ta-center pd-10px bor-1px br-5px cs-p title-hover trss-1-4' onClick={() => onClick && onClick("/" + item.genre + "/" + item.slug)}>read more</p>
                </div>
            </div>
        </div>
    )
}
export const DetailCard = ({ scroll, data, sendChapter }: PropsDetail) => {

    const [currentChangePage, setCurrentChangePage] = useState<ChangePageType>(store.getState().changePage)
    const update = () => {
        store.subscribe(() => setCurrentChangePage(store.getState().changePage))
    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [chapter, setChapter] = useState<number>(-1)

    useEffect(() => {
        sendChapter && sendChapter(chapter)
    }, [chapter])

    useEffect(() => {
        setTimeout(() => {
            currentChangePage.value && toPage.push(currentChangePage.link)
        }, 2000)
    }, [currentChangePage])

    return (
        <div className={`bg dp-flex h100p bs-10px br-5px detail-card-in ${currentChangePage.value ? "detail-card-out" : ""}`}>
            <div className="ps-re w100px ta-center dp-flex fd-col jc-center bg1" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
                <HomeIcon className='svg40px ps-ab bottom-50px cs-p ' onClick={() => { store.dispatch(setChangePage({ value: true, link: "/" })) }} />
                {data.genre !== "page" && <ArrowBackIcon className='svg40px ps-ab bottom-5px cs-p ' onClick={() => { store.dispatch(setChangePage({ value: true, link: ("/" + data.genre) })) }} />}
                <h3>{data.genre}</h3>
            </div>
            <div className="w100p">
                {chapter === -1 ?
                    <div className={`w100p mg-auto  ${data.genre === "book" ? "maxw375px pd-5p" : ""}`}>
                        {data?.cover?.name ?
                            <Image src={process.env.ftp_url + "locand/" + data?.cover?.name} width={500} height={500} alt='cover' style={{ objectFit: "cover", width: "100%", height: "auto" }} priority={true} />
                            : <Image src={"/img/main.jpg"} priority={true} width={500} height={500} alt='cover' style={{ objectFit: "cover", width: "100%", height: "auto" }} />
                        }
                    </div> :
                    <div className={`w100p h400px mg-auto of-auto scroll ${data.genre === "book" ? "pd-5p" : ""}`}>
                        {data?.chapters?.map((c: any, index: number) => <h4 className={`link-hover cs-p ta-js mg-bottom-10px lh30px ${chapter === index ? "color-main" : ""}`} onClick={() => { scroll?.current ? scroll.current.scrollTop = 0 : null; setChapter(index) }} key={index}>{c.title}</h4>)}
                    </div>
                }
                <div className="bor-bottom-2px w50p mg-5p-auto"></div>
                {chapter === -1 &&
                    <div className={`ta-center mg-10px-0px`}>
                        <h2 className='mg-10px-0px'>{data.name}</h2>
                        <h3 className='mg-5px-0px'>{data.author}</h3>
                    </div>}
                <div className="dp-flex ta-right pd-5p fs-75p jc-space">
                    <p className='cs-p link-hover' onClick={() => { scroll?.current ? scroll.current.scrollTop = 0 : null, setChapter(c => c === -1 ? c : c - 1) }}>{chapter !== -1 && "back"}</p>
                    {data.genre === "book" && <p className='cs-p link-hover ' onClick={() => { scroll?.current ? scroll.current.scrollTop = 0 : null, setChapter(c => c === data?.chapters?.length - 1 ? c : c + 1) }}> {chapter !== -1 ? chapter === data?.chapters?.length - 1 ? "" : "next" : "read"}</p>}
                </div>

            </div>
        </div>
    )
}

export const ParallaxCard = ({ item, onClick }: { item: any, onClick?: (link: string) => void }) => {

    const [currentChangePage, setCurrentChangePage] = useState<ChangePageType>(store.getState().changePage)
    const update = () => {
        store.subscribe(() => setCurrentChangePage(store.getState().changePage))
    }
    useEffect(() => {
        update()
    })

    return (
        <div className={`w75w pd-100px-20px-20px zi-hover dp-flex fd-col jc-end h500px ${item.genre === "book" ? "maxw200px" : "maxw375px"}`}>
            <div className={`bg ps-re br-5px pd-10px trss-1-4 bs-5px parallax-card-hover card-in parallax-card-hover ${currentChangePage.value ? "card-out" : ""} `}>
                <div className={`ta-center of-hidden ps-re`}>
                    <p className='w-mc ps-ab fs-75p pd-5px-10px color-white left-0px top-0px' style={{ background: item.genre === "book" ? "darkgreen" : "darkred" }}>{item.genre}</p>
                    {item.cover?.name ?
                        <Image src={process.env.ftp_url + "locand/" + item.cover?.name}
                            width={500}
                            height={500}
                            style={{
                                width: "100%",
                                height: "auto",
                                zIndex: 0
                            }}
                            priority={true}
                            alt='cover' /> :
                        null
                    }

                    <div className={`ps-ab w100p h100p h-mc top-0px right-0px`} onClick={() => onClick && onClick("/" + item.genre + "/" + item.slug)}>
                    </div>

                    <h4 className='pd-5px'>{item.name}</h4>
                </div>
            </div>
        </div>
    )
}
