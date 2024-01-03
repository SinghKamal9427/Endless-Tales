import { useRouter } from 'next/router'
export default function CatchAllSegments() {

    const router = useRouter()

  return (
    <div>
        {router.query.any?.map((val , i)=>{
            return <div key={i}>{val}</div>
        })}
    </div>
  )
}

/* 
we can use both method i.e by creating [...folder] or by creating [...file.jsx]  */