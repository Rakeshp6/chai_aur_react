import { useCallback, useEffect, useState ,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [spCharAllowed,setSpCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(() =>{
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if (numberAllowed) str += "0123456789"
     if (spCharAllowed) str += "!@#$%^&*()_+"

     for (let index = 1; index <= length; index++) {
         let char = Math.floor(Math.random() * str.length + 1)
         pass += str.charAt(char)    
     }

     setPassword(pass)

  },[length,numberAllowed,spCharAllowed,setPassword])
  
  const copyPasswordClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() =>{
    passwordGenerator()
    
  },[length,numberAllowed,spCharAllowed,passwordGenerator])

  return (
    <>
    <h1 className="text-4xl text-center text-white">Password Generator</h1>
    <div className="w-full max-w-md mx-auto shadow-md  rounded-lg my-8 text-orange-500 bg-gray-700">
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" ref={passwordRef} value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly />
         <button onClick={copyPasswordClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>     
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100} value={length} className='cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}} />
               <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
                setNumberAllowed((prev) => !prev);
            }}           
          />
          <label>Number: {numberAllowed}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={spCharAllowed}
            id="spCharInput"
            onChange={() => {
                setSpCharAllowed((prev) => !prev);
            }}           
          />
          <label>Character: {spCharAllowed}</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
