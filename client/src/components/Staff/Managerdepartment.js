

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
import Detaildepartment from './Detaildepartment'
function Login() {
    const [showdelete, setshowdelete] = useState(false)
    const [showdetail, setshowdetail] = useState(false)
    const [department, setdepartment] = useState('')
    const socketRef = useRef()

    const navigate = useNavigate()
    let getuser = () => axios.get(`/api/department`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['department'], getuser)
    const handledelete = (depart) => (e) => {
        setdepartment(depart)
        setshowdelete(true)
    }
    const handleOpenDetail = (depart) => (e) => {
        setdepartment(depart)
        setshowdetail(true)
    }
    const handleEdit = (depart) => (e) => {

        navigate('../adddepartment', { state: { update: 1, department: depart } })
    }
    useEffect(() => {
        socketRef.current = io.connect(`/`)
        socketRef.current.on('reloadcate', (args) => {
            refetch()
        })
    }, [])
    if (isLoading) return <>...loading</>
    console.log(data)
    return (
        <>
            <ReactNotifications />
            <Confirmdelete department={department} showdelete={showdelete} setshowdelete={setshowdelete} />
            <Detaildepartment department={department} showdetail={showdetail} setshowdetail={setshowdetail} />
            <div className='container'>
                <div className='wrap-navigate'>
                    <Link to='../' className='create-new'>Back</Link>
                    <Link className='create-new' to='../adddepartment'>Create new</Link>
                </div>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quantity != 0 ? data.department.map((item, i) => {
                            return (<>
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className='text-center'><button type="" className='btn btn-primary' onClick={handleEdit(item)}> Edit</button></td>
                                    <td><button className='btn btn-primary' onClick={handleOpenDetail(item)}>Detail</button></td>
                                    <td className='text-center'><button type="" className="btn btn-danger" onClick={handledelete(item)}> Delete</button></td>
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
