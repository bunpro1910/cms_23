

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { io } from 'socket.io-client'
import axios from 'axios'
import { AiOutlineFileExcel, AiOutlineFileZip } from 'react-icons/ai'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Confirmdelete from './Confirmdepartment'
import ChartStatic from './ChartStatic'
import socket from '../../model/socket'
function Login() {
    const [showchart, setshowchart] = useState(false)


    const navigate = useNavigate()
    let getuser = () => axios.get(`/api/staff/departmentdetail`).then((res) => res.data)
    const [store, setstore] = useState('')
    const { isLoading, error, data, isFetching, refetch } = useQuery(['departmentdetail'], getuser)

    useEffect(() => {
        socket.on('reloadcate', (args) => {
            refetch()
        })
    }, [])
    if (isLoading) return <>...loading</>

    return (
        <>
            <ChartStatic showchart={showchart} setshowchart={setshowchart} data={data} />
            <div className='container'>
                <div className='wrap-navigate'>
                    <Link className='create-new' to='../' onClick={(e) => setshowchart(true)}>Back</Link>
                    <button className='create-new' type="" onClick={(e) => setshowchart(true)}>show chart</button>
                </div>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Total Idea</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quantity != 0 ? data.department.map((item, i) => {
                            return (<>
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.totalidea}</td>
                                </tr>

                            </>)

                        }) : "don't have any Department"}


                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Login;
