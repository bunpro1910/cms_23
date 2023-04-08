import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { io } from 'socket.io-client'
import axios from 'axios'
import { AiOutlineFileExcel, AiOutlineFileZip } from 'react-icons/ai'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Confirmdelete from './Confirmdeleteuser'
import Detailuser from './Detailuser'
import Viewrole from './Viewrole'
function Login() {
    const [showdelete, setShowdelete] = useState(false)
    const [showdetail, setShowdetail] = useState(false)
    const [showviewrole, setShowviewrole] = useState(false)
    const [account, setAccount] = useState('')
    const socketRef = useRef()
    const navigate = useNavigate()
    let getUsers = () => axios.get(`/admin/user`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['user'], getUsers)

    const handleDelete = (acc) => (e) => {
        setAccount(acc)
        setShowdelete(true)
    }

    const handleOpenDetail = (acc) => (e) => {
        setAccount(acc)
        setShowdetail(true)
    }


    const handleOpenviewrole = (acc) => (e) => {
        setAccount(acc)
        setShowviewrole(true)
    }
    const handleEdit = (user) => (e) => {
        navigate('../addaccount', { state: { update: 1, user: user } })
    }

    useEffect(() => {
        socketRef.current = io.connect(`http://localhost:3001`)

        socketRef.current.on('reloaduser', (args) => {
            refetch()
        })
    }, [])

    if (isLoading) return <>...loading</>
    console.log(data)
    return (
        <>
            <ReactNotifications />
            <Confirmdelete account={account} showdelete={showdelete} setShowdelete={setShowdelete} />
            <Detailuser account={account} showdetail={showdetail} setShowdetail={setShowdetail} />
            <Viewrole account={account} showviewrole={showviewrole} setShowviewrole={setShowviewrole} />
            <div className='container'>
                <div className='wrap-navigate'>
                    <Link to='../' className='create-new'>Back</Link>
                    <Link className='create-new' to='../addaccount'>Create new</Link>
                </div>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>

                            <th scope="col">Username</th>

                            <th scope="col">View Role</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quantity !== 0 ? data.user.map((item, i) => {
                            return (<>
                                <tr>
                                    <th scope="row">{i + 1}</th>

                                    <td>{item.fullname}</td>
                                    <td>{item.accountid}</td>
                                    <td><button type="" className='btn btn-primary' onClick={handleOpenviewrole(item)}>View Role</button></td>
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
