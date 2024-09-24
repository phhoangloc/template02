'use client'
import Parallax from '@/components/home/parallax'
import React, { useState, useEffect } from 'react'
import { ApiItem } from '@/api/client'
import Header from '@/components/home/header'
type Props = {}

const Page = (props: Props) => {

  const [_blog, set_blog] = useState<any[]>([])
  const [_news, set_news] = useState<any[]>([])

  const getBlog = async () => {
    const result = await ApiItem({ genre: "blog" })
    console.log(result)
    if (result.success) {
      set_blog(result.data)
    }
  }
  useEffect(() => {
    getBlog()
  }, [])

  return (
    <div>
      <Header />
      <Parallax data={[..._blog]} />
    </div>
  )
}
export default Page