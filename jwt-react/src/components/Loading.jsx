/* eslint-disable react/prop-types */
import { useState } from "react"
import "../styles/loading.css"
const Loading = ({log}) => {
    const [logRes, setLogRes] =useState(null)
    setTimeout(()=>{
        setLogRes(log)
    }, 2000) 
    
  return (
    <div className='loading-popup'>
        {logRes && (log ==="LOGIN SUCCESSIFUL" || log === "Account Created Successifuly")? (
            <div className="log"><p>{log}</p></div>            
        ):(        
            <div className="loading-icon">
                <div className="loading">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                </div>
                <p> Loading...</p>
            </div>
        )}
    </div>
  )
}

export default Loading
