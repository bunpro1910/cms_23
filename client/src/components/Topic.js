

import {Link}from 'react-router-dom'
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import {useQuery}from 'react-query'
function Login() {
  let gettopic =()=> axios.get(`/api/topic`).then((res) => res.data)
  const socketRef = useRef();
  const { isLoading, error, data, isFetching,refetch  } = useQuery('topic',gettopic,{retry:1})
  useEffect( ()=>{
    
    socketRef.current =io.connect(`/`)
    socketRef.current.on('newtopic',(args)=>{
      refetch()
    })
  },[])
  if(isLoading){return<>... loading</>}

  console.log(data)
  if(data.quantity == 0){
    return(
      <div className='topic-page'>
        <p>{data.topic}</p>
      </div>
     
    )
  }
  return (
    <div className='topic-page'>

    {data.topic.map((topic,i)=>{
      return(
        <div key={topic.id} className="topic bg_success" >
          <div className='topic-info'>
          <Link to={'/idea/'+topic.id} className='topic-link' onClick={localStorage.setItem('topic',topic)} >{topic.id}</Link>
          <p>{topic.name}</p>
          </div>
          <div className='topic-deadline'>
          <p>{new Date(topic.clousuredate).toDateString()+", "+new Date(topic.clousuredate).getHours()+":"+new Date(topic.clousuredate).getMinutes()} - {new Date(topic.finalclosuredate).toDateString()+", "+new Date(topic.finalclosuredate).getHours()+":"+new Date(topic.finalclosuredate).getMinutes()}
            </p>
          </div>
        </div>
      
      )
       })}
    
      
    </div>
  );
}

export default Login;
