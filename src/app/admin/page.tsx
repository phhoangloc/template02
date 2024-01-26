'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Link from 'next/link'
import Login from '@/component/login'

const Admin = () => {


    const router = useRouter()

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    const reCom =
        currentUser && currentUser.position === "admin" ?
            <div className="">
                <h1>welcome my Admin! <br></br>{currentUser.username}</h1>
                <Link href={"/admin/dashboard"}><h2>go to Dashboard</h2></Link>
            </div>
            :
            <Login />


    update()

    return reCom
}

export default Admin