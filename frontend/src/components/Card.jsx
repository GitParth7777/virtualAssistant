import React, { useContext } from 'react'
import { userDataContex } from '../contex/UserContex'

function Card({image}) {
    const {serverUrl,userData, setUserData ,backendImage,setBackendImage ,frontendImage,setFrontendImage,selectedImage,setSelectedImage} = useContext(userDataContex)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#0d0d53] border-2 border-[#33308a4e] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image ? "border-4 border-white shadow-2xl shadow-blue-950 " : null}`} onClick={()=>{
      setSelectedImage(image)
      setBackendImage(null)
      setFrontendImage(null)
    }}>
        <img src={image}  className='h-full object-cover'/>
    </div>
  )
}

export default Card
