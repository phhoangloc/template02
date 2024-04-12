'use client'
import App from "@/component/asset/app"
import Clock from "@/component/asset/clock"
import Box from "@/component/grid/box"
import Grid from "@/component/grid/grid"
import GridChild from "@/component/grid/gridChild"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import store from "@/redux/store"
import Image from "next/image"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import { setTheme } from "@/redux/reducer/ThemeReduce"
import Divider from "@/component/display/divider"
import { setRefresh } from "@/redux/reducer/RefreshReduce"
export default function Home() {
  const toPage = useRouter()
  const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
  const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
  const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
    store.subscribe(() => setCurrentUser(store.getState().user))
    store.subscribe(() => setCurrentRefresh(store.getState().refresh))
  }

  useEffect(() => {
    update()
  })

  const [dividerOpen, setDividerOpen] = useState<boolean>(false)

  const deviders = [
    {
      name: "log in",
      link: "/login"
    },
    {
      name: "sign up",
      link: "/signup"
    }
  ]
  const profiles = [
    {
      name: "profile",
      link: "/profile"
    },
    {
      name: "admin",
      link: "/admin"
    },
    {
      name: "log out",
      func: () => { localStorage.clear(); store.dispatch(setRefresh()) }
    }
  ]

  return (
    <Box className="minHeight100vh center">
      <Box style={{ position: "absolute", top: 0, width: "100%", textAlign: "right", height: "40px", zIndex: 2 }}>
        {currentUser?.avata ?
          <Image src={process.env.google_url + currentUser?.avata.name} width={500} height={500} alt="avata" style={{ cursor: "pointer", width: "30px", height: "auto", margin: "5px", borderRadius: "50%" }} onClick={() => setDividerOpen(!dividerOpen)} /> :
          <PersonIcon style={{ width: "30px", height: "30px", margin: "5px", cursor: "pointer" }} onClick={() => setDividerOpen(!dividerOpen)} />}
        {currentTheme ?
          <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} style={{ width: "30px", height: "30px", margin: "5px", cursor: "pointer" }} /> :
          <LightModeIcon onClick={() => store.dispatch(setTheme(true))} style={{ width: "30px", height: "30px", margin: "5px", cursor: "pointer" }} />}
        {currentUser._id ?
          <Divider data={profiles}
            style={{ position: "absolute", top: "40px", right: "5px", width: "150px", transform: dividerOpen ? "translateX(0%)" : "translateX(110%)", padding: "5px", borderRadius: "5px" }}
            onClick={() => { setDividerOpen(false) }} /> :
          <Divider data={deviders}
            style={{ position: "absolute", top: "40px", right: "5px", width: "150px", transform: dividerOpen ? "translateX(0%)" : "translateX(110%)", padding: "5px", borderRadius: "5px" }}
            onClick={() => setDividerOpen(false)} />}
      </Box>
      <Clock />
      <App />
    </Box>
  )

}
