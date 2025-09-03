import React, { useContext, useState } from 'react'
import { userDataContex } from '../contex/UserContex.jsx'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Customize2() {
    const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContex)
    const[assistantName,setAssistantName]=useState(userData?.AssistantName || "")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const handleUpdateAssistant = async ()=>{
        setLoading(true)
        try {
            let fromData =new FormData()
            fromData.append("assistantName",assistantName)
            if(backendImage){
                fromData.append("assistantImage",backendImage)
            }else{
                fromData.append("imageUrl",selectedImage)
            }
            const result =await axios.post(`${serverUrl}/api/user/update`,fromData,{withCredentials:true})

            console.log(result.data)
            setUserData(result.data)
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#04045c] flex justify-center items-center flex-col p-[20px] relative'>
        <MdKeyboardBackspace className='cursor-pointer absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]' onClick={()=>navigate("/customize")} />
      <h1 className='text-white text-[30px] mb-[40px] text-center'>Enter your <span className='text-blue-400'>Assistant Name</span></h1>

      <input type="text" placeholder='eg. Jarvis' name=""  className='w-full max-w-[600px] outline-none h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full tetx-[18px]' required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>
        {assistantName && <button className='min-w-[300px] h-[60px] rounded-full bg-white font-semibold text-blac k text-[19px] mt-[30px] cursor-pointer' disabled={loading} onClick={()=>{
            handleUpdateAssistant()
            }}>{!loading ? "Finally Create YOur Assistant" : "Loading..."}</button> }
      

    </div>
  )
}

export default Customize2
