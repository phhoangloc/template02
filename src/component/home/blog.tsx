import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import moment from 'moment'
import { blogTypeForTopPage } from '@/type/blogType'
import { useRouter } from 'next/navigation'
import Blogcard from './blogcard'

const Blog = () => {

    const topage = useRouter()
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
                        <Blogcard blog={book} key={index} />
                    )
                }
            </div>
        </div>
    )
}

export default Blog