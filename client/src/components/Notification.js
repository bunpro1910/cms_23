

import {Link}from 'react-router-dom'
import {useState,useEffect} from 'react'
import { AiOutlineSend  } from 'react-icons/ai';
function View({props}) {
  const [msg,setmsg] =useState('error')
  const [status,setstatus] =useState(true)
   const [show,setshow] =useState(true)
 

  useEffect(()=>{

      if(props){
    
    setmsg(props.msg)
    setstatus(props.status)
  }
  },[])
  
   let classname = status?'bg_green':'bg_red'
   if(show==false)return <></>
  return (
    <div className={'notification '+classname} >
      
        <p className= {classname}>{msg}</p>
        <button className='btn-ok' onClick={(e)=>{setshow(false)}}>OK</button>
    </div>
  );
}

export default View;
