import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
type Props = {
    book: any
}

const Bookcard = ({ book }: Props) => {
    const toPage = useRouter()
    return (
        <div className='book_card xs6 md4 lg3' onClick={() => toPage.push(`/home/${book.genre}/${book.slug}`)}>
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

export default Bookcard