import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import moment from 'moment'
type Props = {
    blog: any,

}

const Blogcard = ({ blog }: Props) => {
    const toPage = useRouter()
    return (
        <div className='blog_card xs12 md6 lg4' onClick={() => toPage.push(`/home/${blog.genre}/${blog.slug}`)}>
            <div className="card_picture">
                <Image src={process.env.google_url + blog.cover} alt="" width={500} height={500} />
            </div>
            <div className="card_title center">
                <p className='title_blog'><span>{moment(blog.createDate).format('YY-MM-DD')}</span> {blog.title} </p>
                <p className='genre_blog'>{blog.genre}</p>
            </div>
        </div>
    )
}

export default Blogcard