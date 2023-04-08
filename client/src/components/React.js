
import {Link,useLocation}from 'react-router-dom'
import {useState,useEffect,useRef,} from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import {useQuery ,useQueries}from 'react-query'
import { AiOutlineLike ,AiOutlineDislike } from 'react-icons/ai';
import View from'./View'
import Comment from'./Comment'

function React({topicid}) {

  let getreact =()=> axios.get(`/api/react?id=${id}`).then((res) => res.data)
  const socketRef = useRef();
 
 
  const { isLoading :isloadingreact, error :errreact, data :react, isFetching :isFetchingreact,refetch :refetchreact  } = useQuery('react',getreact,{retry:1})

  useEffect( ()=>{
    
    socketRef.current =io.connect(`/`)
    socketRef.current.on('newtopic',(args)=>{
    
        refetchreact()
    })



  },[])

  if(isFetchingreact){return<>... loading</>}

  return (
 
        <>
            <p className='react'><button className='btn-like'><AiOutlineLike/> 1 Like</button><button className='btn-dislike'><AiOutlineDislike/> 1 Dislike</button></p>
            
        </>

  );
}

export default React;
