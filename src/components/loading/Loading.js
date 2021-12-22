import React from 'react'
import { useSelector } from 'react-redux'
export default function Loading() {

    const  {visible} =  useSelector(state => state.loadingReducer)
    return (
        <div className = 'fixed top-0 left-0 h-screen w-screen z-40' style = {{
            backgroundColor: "rgb(239,247,247)",
            opacity: '0.6',
            display: `${visible}`
           
        }}>
                <img src = {require('../../assets/img/loading/slack_animation.gif').default}    className = 'absolute top-1/2 left-1/2  h-28 object-cover' style = {{
                    transform: 'translate(-50%,-50%)'
                }} alt = 'Loading-Spinner' ></img>
               
        </div>
    )
}
