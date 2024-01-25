'use client'
import { useState, useEffect } from "react"
import store from "@/redux/store"
import { useRouter } from "next/navigation"
import Login from "@/component/home/login"
export default function Home() {

  const toPage = useRouter()
  const [user, setCurrentUser] = useState<any>(store.getState().user)

  const update = () => {
    store.subscribe(() => setCurrentUser(store.getState().user))
  }

  useEffect(() => {
    update()
  }, [])

  if (user._id) {
    toPage.push(("/home"))
  } else {
    return (
      <main className="height-100vh center textAlignCenter">
        <Login />
      </main>
    )
  }

}
