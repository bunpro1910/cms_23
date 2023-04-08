

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { AiOutlineFileExcel, AiOutlineFileZip } from 'react-icons/ai'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
function Login() {

    let getuser = () => axios.get(`/topic`).then((res) => res.data)
    const { isLoading, error, data, isFetching, refetch } = useQuery(['topic'], getuser)
    const exportExcel = (id) => async (e) => {
        e.preventDefault()
        let result = await axios.get(`/export?id=${id}`, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", "excel.xlsx");
        document.body.appendChild(link);
        link.click();
        Store.addNotification({
            title: "Export successfully",
            message: `Export successfully`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        })
    }
    const exportZip = (id) => async (e) => {
        e.preventDefault()
        let result = await axios.get(`/exportzip?id=${id}`, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "excel.zip");
        document.body.appendChild(link);
        link.click();
        Store.addNotification({
            title: "Export Zip successfully",
            message: `Export  Zip successfully`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        })
    }
    useEffect(() => {

    }, [])
    if (isLoading) return <>...loading</>
    console.log(data)
    return (
        <>
            <ReactNotifications />
            <div className='container'>
                <div className='wrap-navigate'>
                    <Link to='../' className='create-new'>Back</Link>

                    <Link className='create-new' to='../addtopic'>Create new</Link>
                </div>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>

                            <th scope="col">Topic Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Final Date</th>
                            <th scope="col">Export to excel</th>
                            <th scope="col">View Idea</th>
                            <th scope="col">Export to Zip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quantity != 0 ? data.topic.map((item, i) => {
                            return (<>
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{new Date(item.clousuredate).getHours() + ":" + new Date(item.clousuredate).getMinutes() + ", " + new Date(item.clousuredate).toDateString()}</td>
                                    <td>{new Date(item.finalclosuredate).getHours() + ":" + new Date(item.finalclosuredate).getMinutes() + ", " + new Date(item.finalclosuredate).toDateString()}</td>
                                    <td className='text-center'><button className='btn btn-primary' onClick={exportExcel(item.id)} type=""><AiOutlineFileExcel /></button></td>
                                    <td><Link to={"/idea/" + item.id}>view idea</Link></td>
                                    <td className='text-center'><button className='btn btn-primary' onClick={exportZip(item.id)} type=""><AiOutlineFileZip /></button></td>
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
