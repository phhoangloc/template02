import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import moment from 'moment'
import { blogTypeForTopPage } from '@/type/blogType'

const Blog = () => {

    const [blogs, setBlogs] = useState<blogTypeForTopPage[]>([])

    const getBooks = async () => {
        const result = await axios.get(process.env.server_url + "blog")
        if (result.data.success) {
            setBlogs(result.data.data)
        } else {
            setBlogs([])
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div className='blog'>
            <h2>Blog</h2>
            <div className="grid_box box_content ">
                {
                    blogs.map((book, index) =>
                        <div key={index} className='blog_card xs12 md6 lg4'>
                            <div className="card_picture">
                                <Image src={process.env.google_url + book.cover} alt="" width={500} height={500} />
                            </div>
                            <div className="card_title center">
                                <p className='title_blog'><span>{moment(book.createDate).format('YY-MM-DD')}</span> {book.title} </p>
                                <p className='genre_blog'>{book.genre}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Blog