import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { io } from 'socket.io-client'
import axios from 'axios'
import { AiOutlineFileExcel, AiOutlineFileZip } from 'react-icons/ai'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Confirmdelete from './Confirmdeleterole'
import Detailtopic from './Detailrole'

function Login() {
    const [showdelete, setShowdelete] = useState(false)
    const [showdetail, setShowdetail] = useState(false)
    const [role, setRole] = useState('')
    const socketRef = useRef()
    const navigate = useNavigate()
    let getUsers = () => axios.get(`/api/staff/role`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['role'], getUsers)

    const handleDelete = (role) => (e) => {
        setRole(role)
        setShowdelete(true)
    }

    const handleOpenDetail = (role) => (e) => {
        setRole(role)
        setShowdetail(true)
    }

    const handleEdit = (role) => (e) => {
        navigate('../addrole', { state: { update: 1, role: role } })
    }

    useEffect(() => {
        socketRef.current = io.connect(`http://localhost:3000/`)
        socketRef.current.on('reloadrole', (args) => {
            refetch()
        })
    }, [])

    if (isLoading) return <>...loading</>
    console.log(data)
    return (
        <>
            <ReactNotifications />
            <Confirmdelete role={role} showdelete={showdelete} setShowdelete={setShowdelete} />
            <Detailtopic role={role} showdetail={showdetail} setShowdetail={setShowdetail} />
            <div className='container'>
                <div className='wrap-navigate'>
                    <Link to='../' className='create-new'>Back</Link>
                    <Link className='create-new' to='../addrole'>Create new</Link>
                </div>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>

                            <th scope="col">Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quantity !== 0 ? data.role.map((item, i) => {
                            return (<>
                                <tr>
                                    <th scope="row">{i + 1}</th>

                                    <td>{item.name}</td>
                                    <td className='text-center'><button type="" className='btn btn-primary' onClick={handleEdit(item)}> Edit</button></td>
                                    <td><button className='btn btn-primary' onClick={handleOpenDetail(item)}>Detail</button></td>
                                    <td className='text-center'><button type="" className="btn btn-danger" onClick={handleDelete(item)}> Delete</button></td>
                                </tr>

                            </>)

                        }) : "Don't have any roles"}


                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Login;
