import React, { useEffect, useRef, useState } from 'react'
import Mood from './components/Mood'
const App = () => {
  const[mood , setMood]=useState(null);
  const audioRef = useRef(null);
  useEffect(()=>{
    if(mood && audioRef.current){
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  },[mood])
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500'>
      <h1 className='text-3xl'> mood based songs</h1>
      <Mood onMoodChange={setMood}/>
       {mood && (
        <div>
          <h2 className='text-2xl m-3 mt-4'>{mood.message}</h2>
          <audio src="" ref={audioRef} controls className='mt-7'>
            <source src={mood.music} type='audio/mp3'/>
          </audio>
           </div>
       )}
    </div>
  )
}

export default App