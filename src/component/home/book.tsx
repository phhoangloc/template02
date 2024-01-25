import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { bookTypeForTopPage } from '@/type/bookType'

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
                {
                    books.map((book, index) =>
                        <div key={index} className='book_card xs6 md4 lg3'>
                            <div className="card_picture">
                                <Image src={book.img && process.env.google_url + book.img} alt="" width={500} height={500} />
                            </div>
                            <div className="card_title center">
                                <p className='title_book '>{book.name}</p>
                                <p className='genre_book'>{book.genre}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Book