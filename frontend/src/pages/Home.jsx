import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContex } from '../contex/UserContex.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import User from '../../../backend/models/user.model.js';

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContex);
  const navigate = useNavigate()

  const [started, setStarted] = useState(false); // new changes

  const [usertext, setUsertext] = useState("")
  const [aitext, setAitext] = useState("")
  const [listening, setListening] = useState(false)
  const [ham, setHam] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis


  const startAssistant = () => {
    setStarted(true); // marks that user has interacted new changes
  };


  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      console.log(error);
      setUserData(null)

    }
  }


  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start()
        setListening(true);
      } catch (error) {
        if (!error.message.includes("start")) {
          console.error("Recognition error:", error);
        }
      }
    }

  }

  const speak = (text) => {

    const utterence = new SpeechSynthesisUtterance(text);
    utterence.lang = 'hi-IN';
    const voices = window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterence.voice = hindiVoice;
    }

    isSpeakingRef.current = true

    utterence.onend = () => {
      setAitext("")
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition()  // delay for avoiding race condition 
      }, 800);

    }

    synth.cancel()  // aage ki speech ko hata ne ke liee
    synth.speak(utterence);

  }

  const handlecommand = (data) => {
    if (!data || !data.type) {
      console.error("Invalid response from backend:", data);
      speak("Sorry, I didn't understand that.");
      return;
    }

    const { type, userInput, response } = data;
    speak(response);

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
    if (type === 'calculator-open') {
      window.open('https://www.google.com/search?q=calculator', '_blank');
    }
    if (type === 'instagram-open') {
      window.open('https://www.instagram.com', '_blank');
    }
    if (type === 'facebook-open') {
      window.open('https://www.facebook.com', '_blank');
    }
    if (type === "weather-show") {
      window.open('https://www.google.com/search?q=weather', '_blank');
    }
    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  };



  useEffect(() => {
    if (!started) return; // new changes

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = false;

    recognitionRef.current = recognition

    let isMounted = true; // fleg to avois setstate on unmounted compontant

    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("Recognitation request to start ");


        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.log(e);
          }
        }
      }
    }, 1000);





    const safeRecognition = () => {

      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start()
          console.log("Recognition requested to start")
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("Start error :", error);
          }
        }
      }
    }

    recognition.onstart = () => {

      isRecognizingRef.current = true;
      setListening(true);
    }

    recognition.onend = () => {

      isRecognizingRef.current = false;
      setListening(false);


      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognition()
        }, 1000);
      }
    };

    recognition.error = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start()
              console.log("Recognition requested to start")
            } catch (error) {
              if (error.name !== "InvalidStateError") {
                console.error("Start error :", error);
              }
            }
          }

        }, 1000);
      }
    }


    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAitext("")
        setUsertext(transcript)
        recognition.stop()
        isRecognizingRef.current = false;
        setListening(false)
        const data = await getGeminiResponse(transcript)
        handlecommand(data)
        setAitext(data.response)
        setUsertext("")
      }

    }




    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition()
      }
    }, 10000);

    safeRecognition() //first time call

  
      const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
      greeting.lang = 'hi-IN';
      window.speechSynthesis.speak(greeting);
   



    return () => {
      isMounted = false;
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
      clearTimeout(startTimeout)
      clearInterval(fallback)
    }


  }, [started])   // new chanes 

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#04045c] flex justify-center items-center flex-col gap-[15px] overflow-hidden'>

      <HiMenuAlt3 className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />

      <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000060] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham ? "translate-x-0" : "-translate-x-full"} transition-transform`}>

        <RxCross1 className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
        <button className='w-[150px] h-[50px] rounded-full bg-white font-semibold text-blac k text-[19px] cursor-pointer ' onClick={handleLogOut} >Log Out </button>

        <button className='w-[300px] h-[50px] rounded-full bg-white font-semibold  text-blac k text-[19px] px-[20px] py-[10px] cursor-pointer ' onClick={() => navigate("/customize")}  >Customize your Assistance</button>

        <div className='w-full h-[2px] bg-gray-400'></div>
        <h1 className='text-white font-semibold text-[19px] '>History</h1>
        <div className='w-full h-[400px] overflow-y-auto flex flex-col gap-[20px]'>
          {userData.history?.map((his) => (
            <span className='text-gray-200 text-[18px] truncate'>{his}</span>
          ))}
        </div>


      </div>


      <button className='min-w-[150px] h-[50px] rounded-full bg-white font-semibold text-blac k text-[19px] mt-[30px] absolute top-[20px] right-[20px] cursor-pointer hidden lg:block' onClick={handleLogOut} >Log Out </button>

      <button className='w-[300px] h-[50px] rounded-full bg-white font-semibold absolute text-blac k text-[19px] mt-[20px] top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer hidden lg:block' onClick={() => navigate("/customize")}  >Customize your Assistance</button>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg '>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>


      <h1 className='text-white text-[18px] font-semibold'>I'm {userData.assistantName}</h1>

      {!aitext && <img src={userImg} className='w-[200px]' alt="" />}
      {aitext && <img src={aiImg} className='w-[200px]' alt="" />}

      <h1 className='text-white text-[18px] font-semibold text-wrap'>{usertext ? usertext : aitext ? aitext : null}</h1>

      {!started && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/70 text-white cursor-pointer z-50"
          onClick={startAssistant}
        >
          Click anywhere to start assistant
        </div>
      )}

    </div>
  )
}

export default Home
