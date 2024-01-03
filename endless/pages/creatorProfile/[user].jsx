import "../../app/globals.css";
import { useRouter } from 'next/router'
import React from 'react'
import HeaderBoard from "../leaderboard/headerBoard";
import CreaterProfile from "../creatorProfile/creatorProfileDisplay.jsx";

export default function UserProfileB () {
    const router = useRouter()
  return (
   <>
        <HeaderBoard/>
        <CreaterProfile/>{/* 
    <div>{router.query.user}</div> */}
    </>
  )
}
