

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toast } from 'react-toastify'
function Login(props) {

    let getuser = () => axios.get(`/api/department`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['department'], getuser)
    const location = useLocation()
    const navigate = useNavigate()

    let [user, setuser] = useState(
        location.state ? {
            email: location.state.user.email,
            phone: location.state.user.phone,
            account_id: location.state.user.accountid,
            departmentid: location.state.user.departmentid,
            fullname: location.state.user.fullname,
            password: location.state.user.password

        } :
            {
                email: '',
                phone: '',
                account_id: '',
                departmentid: '',
                fullname: '',
                password: '',
            }
    )
    async function handlesubmit(e) {
        e.preventDefault()
        let result = await axios.post(`/api/admin/adduser`, { user, update: location.state?.update });

        if (result.data.isSuccess) {
            setuser({
                email: '',
                phone: '',
                account_id: '',
                departmentid: '',
                fullname: '',
                password: '',

            })

            toast.success("add successfully")

            navigate('../user')
        } else {
            toast.err(result.data.message)

        }

    }



    useEffect(() => {

    }, [user])
    if (isLoading) return <>...loading</>
    return (
        <>

            <div className='container'>
                <form className='form-manager' onSubmit={handlesubmit} >


                    <div className='mb-3'>
                        <label className='form-label' >Full Name</label>
                        <input type='text' className='form-control' onChange={(e) => { user.fullname = e.target.value; setuser({ ...user }) }} value={user.fullname} ></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'  >Email</label>
                        <input type='email' className='form-control' onChange={(e) => { user.email = e.target.value; setuser({ ...user }) }} value={user.email}></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Account ID</label>
                        <input type='text' className='form-control' onChange={(e) => { user.account_id = e.target.value; setuser({ ...user }) }} value={user.account_id} readOnly={location.state ? true : false} ></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Password</label>
                        <input type='password' className='form-control' onChange={(e) => { user.password = e.target.value; setuser({ ...user }) }} value={user.password} ></input>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'  >Phone Number</label>
                        <input type='text' className='form-control' onChange={(e) => { user.phone = e.target.value; setuser({ ...user }) }} value={user.phone}></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Department</label>
                        <select className='form-control' onChange={(e) => { user.departmentid = e.target.value; setuser({ ...user }) }} value={user.departmentid} >
                            <option value="" defaultValue={true}>Select Department</option>
                            {data.department.map((item, i) => {
                                return <option value={item.id} >{item.name}</option>
                            })}
                        </select>
                    </div>

                    <div className='btn-submit-wrap'>
                        <button type='submit' className='btn btn-primary'>Add Account</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
