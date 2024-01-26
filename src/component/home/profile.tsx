'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import Image from 'next/image'
import axios from 'axios'
const Profile = () => {
    const [user, setUser] = useState<any>()
    const getUser = async () => {
        const result = await axios.get(process.env.server_url + "user", {
            headers: {
                'Authorization': localStorage.token,
                'Content-Type': 'application/json'
            },
        })
        setUser(result.data.data)
    }
    useEffect(() => {
        getUser()
    }, [])

    const reCom = user ?
        <div className='home_pages height-100vh textAlignCenter'>
            <div className="row row1">
                <div className="avata">
                    <Image src={process.env.google_url + user?.infor.avata} height={150} width={150} alt='avata' />
                </div>
                <div className="username">
                    <h3>{user?.username}</h3>
                    <h4>{user?.infor.fullname}</h4>
                </div>
            </div>
            {user?.books?.length ? <div className="row row2">
                <h2>Book</h2>
                {
                    user?.books?.map((item: any, index: number) =>
                        <p key={index}>
                            {item.name}
                        </p>
                    )
                }
            </div> : null}
            {user?.blogs?.length ? <div className="row row2">
                <h2>Blog</h2>
                {
                    user?.blogs?.map((item: any, index: number) =>
                        <p key={index}>
                            {item.title}
                        </p>
                    )
                }
            </div> : null}
        </div>
        :
        null
    return reCom
}

export default Profile