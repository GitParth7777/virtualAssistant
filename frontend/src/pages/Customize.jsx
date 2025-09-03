import React, { useRef } from 'react'
import { useContext } from 'react'
import Card from '../components/card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { userDataContex } from '../contex/UserContex.jsx'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";
const Customize = () => {
      const {
    serverUrl,
    userData, setUserData,
    backendImage, setBackendImage,
    frontendImage, setFrontendImage,
    selectedImage, setSelectedImage
  } = useContext(userDataContex);
    const inputImage = useRef()
    const navigate = useNavigate()
    const handleImage = (e)=>{
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#04045c] flex justify-center items-center flex-col p-[20px]'>
      <MdKeyboardBackspace className='cursor-pointer absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]' onClick={()=>navigate("/")} />
        <h1 className='text-white text-[30px] mb-[40px] text-center'>Select your <span className='text-blue-400'>Assistant Image</span></h1>
        <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
      <Card image={image1}/>
      <Card image={image2}/>
      <Card image={image3}/>
      <Card image={image4}/>
      <Card image={image5}/>
      <Card image={image6}/>
      <Card image={image7}/>
       <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#0d0d53] border-2 border-[#33308a4e] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage== "input" ? "border-4 border-white shadow-2xl shadow-blue-950 " : null}`} onClick={()=>{
        inputImage.current.click()
        setSelectedImage("input")
        }}>
        {!frontendImage && <RiImageAddLine className='text-white h-[25px] w-[25px]' /> }
        {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
       
       <input type="file" accept='image/*' ref={inputImage} onChange={handleImage} hidden/>
        </div>
        
        </div>
        {selectedImage && <button className='min-w-[150px] h-[60px] rounded-full bg-white font-semibold text-blac k text-[19px] mt-[30px] cursor-pointer' onClick={()=>navigate("/customize2")}>Next</button> }
        
    </div>
  )
}

export default Customize
