

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { io } from 'socket.io-client'
import axios from 'axios'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Confirmdelete from './Confirmdelete'
import Detailtopic from './Detailcategory'
function Login() {
    const [showdelete, setshowdelete] = useState(false)
    const [showdetail, setshowdetail] = useState(false)
    const [category, setcategory] = useState('')
    const socketRef = useRef()
    const navigate = useNavigate()
    let getuser = () => axios.get(`/category`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['category'], getuser)
    const handledelete = (topic) => (e) => {
        setcategory(topic)
        setshowdelete(true)
    }
    const handleOpenDetail = (category) => (e) => {
        setcategory(category)
        setshowdetail(true)
    }
    const handleEdit = (cate) => (e) => {

        navigate('../addcate', { state: { update: 1, category: cate } })
    }
    useEffect(() => {
        socketRef.current = io.connect(`http://localhost:3001`)
        socketRef.current.on('reloadcate', (args) => {
            refetch()
        })
    }, [])
    if (isLoading) return <>...loading</>
    console.log(data)
    return (
        <>
            <ReactNotifications />
            <Confirmdelete category={category} showdelete={showdelete} setshowdelete={setshowdelete} />
            <Detailtopic category={category} showdetail={showdetail} setshowdetail={setshowdetail} />
            <div className='container'>
                <div className='wrap-navigate'>
                    <Link to='../' className='create-new'>Back</Link>
                    <Link className='create-new' to='../addcate'>Create new</Link>
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
                        {data.quantity != 0 ? data.category.map((item, i) => {
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

                        }) : "don't have any Category"}


                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Login;
