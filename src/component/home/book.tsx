import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { bookTypeForTopPage } from '@/type/bookType'
import Bookcard from './bookcard'

const Book = () => {

    const [books, setBooks] = useState<bookTypeForTopPage[]>([])

    const getBooks = async () => {
        const result = await axios.get(process.env.server_url + "book")
        if (result.data.success) {
            setBooks(result.data.data)
        } else {
            setBooks([])
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div className='book'>
            <h2>Book</h2>
            <div className="grid_box box_content ">
                {books.map((book, index) => <Bookcard book={book} key={index} />)}
            </div>
        </div>
    )
}

export default Book