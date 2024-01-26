'use client'
import React from 'react'
import Cover from '@/component/home/cover'
import Book from '@/component/home/book'
import Blog from '@/component/home/blog'

const Home = () => {

    return (
        <div className='page'>
            <Cover />
            <Blog />
            <Book />
        </div>
    )
}

export default Home