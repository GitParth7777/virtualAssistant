import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContex } from '../contex/userContex';
import axios from 'axios';

const SignIn = () => {
    const {serverUrl,userData, setUserData} = useContext(userDataContex)
    const [showPassword,setShowPassword] = useState(false)
    const navigate=useNavigate() 
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [err,setErr]=useState("")
    const [loading,setLoading]=useState(false)

    const handleSignIn = async (e)=>{
       e.preventDefault()

        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signin`,{
                email,password
            },{withCredentials:true})
            setUserData(result.data)
            setLoading(false)
            navigate("/")
        } catch (error) {
            setUserData(null)
            setErr(error.response.data.message);
            setLoading(false)
        }
    }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center ' style={{backgroundImage : `url(${bg})`}}>
        <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000069] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>
            <h1 className='text-white font-semibold text-[30px] mb-[30px]'>Sign In to <span className='text-blue-400'>Virtual Assistant</span></h1>  
            

            <input type="email" placeholder='Email' name=""  className='w-full outline-none h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full tetx-[18px]' required onChange={(e)=>{setEmail(e.target.value)}} value={email} />

            <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
                <input type={showPassword?"text":"password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                {!showPassword && <IoEye className='absolute text-white top-[18px] right-[20px] w-[25px] h-[25px] cursor-pointer' onClick={()=>setShowPassword(true)}/>}
                 {showPassword && <IoEyeOff className='absolute text-white top-[18px] right-[20px] w-[25px] h-[25px] cursor-pointer' onClick={()=>setShowPassword(false)}/>}
                
            </div>

            {err.length>0 && <p className='text-red-500 text-[17px]'> *{err} </p>}

            <button className='w-[150px] h-[60px] rounded-full bg-white font-semibold text-blac k text-[19px] mt-[30px]' disabled={loading}>{loading?"loading...,":"Sign In"}</button>
            <p className='text-white text-[18px]' onClick={()=>navigate("/signup")}>Want to create a new account ? <span className='text-blue-400'>Sign Up</span></p>                         
        </form>
    </div>
  )
}

export default SignIn
