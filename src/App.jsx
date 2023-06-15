import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const tasksData = [{title:"Take online assessment test",description:"Revise all course material for the test and apply for the test online.",complete:false},{title:"Dinner",description:"Purchase all required ingredients for dinner tonight.",complete:true}]
function App() {
  const [tasks, setTasks] = useState([])

  return (
    <>
        {tasksData.length ? tasksData.map((task)=>{
            return(
                <div>
                    <p>{task.title}</p>
                </div>
            )
        }) : <></>

        }
    </>
  )
}

export default App
