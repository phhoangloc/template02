'use client'
import Parallax from '@/components/home/parallax'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/tool/input/button'
import Cover from '@/components/home/cover'
import Header from '@/components/home/header'
type Props = {}

const Page = (props: Props) => {

  return (
    <div>
      <Header />
      <Cover />
    </div>
  )
}
export default Page