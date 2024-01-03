import { useEffect, useState } from 'react'
import * as CreatorsDb from './creatorDb.js'
import { useRouter } from 'next/router'

export default function Creators({ step }) {

  const router = useRouter()

  const { creators , listeners , newUsers } = CreatorsDb 

  const [boardStyleHead , setBoardStyleHead] = useState({
    header : "",
    headerStyle : "",
  })

  useEffect(()=>{
  if(step){
    if(step == "creators"){
      setBoardStyleHead((val)=>({...val , header:creators.header ,headerStyle:creators.styleHead }))
    }else if(step == "listeners"){
      setBoardStyleHead((val)=> ({...val , header:listeners.header ,headerStyle:listeners.styleHead}))
    }else if(step == "newUsers"){
      setBoardStyleHead((val)=> ({...val , header:newUsers.header , headerStyle:newUsers.styleHead}))
    }
  }
  },[step])

  const handlePush = (id) => {
    router.push(`/creatorProfile/${id}`)
  }


  return (
    <div className="bg-white max-w-[800px] mx-auto rounded-xl shadow-xl ">
      <div className="text-center font-extrabold py-4">
        Top 10 {boardStyleHead?.header} of this Week
      </div>
      <div >
        <table className="w-[100%]">
          <thead className={`${boardStyleHead?.headerStyle} text-left text-[14px] text-white`}>
            <tr>
              <th className="text-center py-2">Rank</th>
              <th>Creator</th>
              <th>Level</th>
              <th>Badge</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            <tr className="border-b-2 border-gray-200 cursor-pointer" onClick={()=>handlePush(1)}>
                <td className="text-center py-2">1</td>
                <td>Roblox</td>
                <td>Budding Bard</td>
                <td>icon</td>
                <td>100pts</td>
            </tr>
            <tr>
                <td className="text-center py-2">2</td>
                <td>Roblox</td>
                <td>Budding Bard</td>
                <td>icon</td>
                <td>100pts</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
