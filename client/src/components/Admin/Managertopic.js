

import { Link ,useNavigate} from 'react-router-dom'
import { useState, useEffect,useRef } from 'react'
import { useQuery } from 'react-query'
import {io} from 'socket.io-client'
import axios from 'axios'
import { AiOutlineFileExcel, AiOutlineFileZip } from 'react-icons/ai'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Confirmdelete from './Confirmdelete'
import Detailtopic from './Detailtopic'
function Login() {
    const [showdelete,setshowdelete] = useState(false)
    const [showdetail,setshowdetail] = useState(false)
    const [topic,settopic] = useState('')
    const socketRef = useRef()
    const navigate = useNavigate()
    let getuser = () => axios.get(`/api/topic`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['topic'], getuser) 
    const handledelete =(topic)=>(e)=>{
        settopic(topic)
        setshowdelete(true)
    }
    const handleOpenDetail = (topic)=>(e)=>{
        settopic(topic)
        setshowdetail(true)
    }
    const handleEdit = (topic)=>(e)=>{
        settopic(topic)
        navigate('../addtopic',{state:{update:1,topic:topic}})
    }
    useEffect(() => {
        socketRef.current = io.connect(`/`)
        socketRef.current.on('reloadtopic', (args) => {
          refetch()
        })
    }, [])
    if (isLoading) return <>...loading</>
    console.log(data)
    return (
        <>
            <ReactNotifications />
            <Confirmdelete  topic = {topic} showdelete = {showdelete} setshowdelete ={setshowdelete}/>
            <Detailtopic  topic = {topic} showdetail = {showdetail} setshowdetail ={setshowdetail}/>
            <div className='container'>
                <div className='wrap-navigate'>
                <Link to='../' className='create-new'>Back</Link>
                <Link to='../addtopic' className='create-new'>Create new</Link>
                </div>
               
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                           
                            <th scope="col">Topic Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Final Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quantity != 0 ? data.topic.map((item, i) => {
                            return (<>
                                <tr>
                                    <th scope="row">{i + 1}</th>
                
                                    <td>{item.name}</td>
                                    <td>{new Date(item.clousuredate).getHours() + ":" + new Date(item.clousuredate).getMinutes() + ", "+ new Date(item.clousuredate).toDateString()}</td>
                                    <td>{new Date(item.finalclosuredate).getHours() + ":" + new Date(item.finalclosuredate).getMinutes() + ", "+ new Date(item.finalclosuredate).toDateString()}</td>
                                    <td className='text-center'><button type=""className='btn btn-primary' onClick={handleEdit(item)}>  Edit</button></td>
                                    <td><button className='btn btn-primary'onClick={handleOpenDetail(item)}>Detail</button></td>
                                    <td className='text-center'><button type="" className="btn btn-danger" onClick={handledelete(item)}>Delete</button></td>
                                </tr>

                            </>)

                        }) : "don't have any topic"}


                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Login;
