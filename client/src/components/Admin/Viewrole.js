

import { useRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useQuery } from 'react-query'
import { AiFillMinusSquare } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function View(props) {

    let [roleid,setroleid]= useState('')
    let getUsers = () => axios.get(`/api/staff/roledetail?id=${props.account.id}`).then((res) => res.data)
    const [user, Setuser] = useState(JSON.parse(localStorage.getItem('user')))
    const { isLoading, error, data, isFetching, refetch } = useQuery(['roledetail'], getUsers, { enabled: props.showviewrole })
    let getRole = () => axios.get(`/api/staff/role`).then((res) => res.data)
    const socketRef = useRef()
    const { isLoading: isloadingrole, error: errrole, data: role, isFetching: isfetchingrole, refetch: refetthrole } = useQuery(['role'], getRole)
    const handleAddRolebyuser=(roleid)=> async (e)=>{
            
       
    }
    const handleDeleteRolebyuser=(roleid)=> async (e)=>{
            
        let result = await axios.post(`/api/admin/removerolebyuser`,{id:roleid,userid:props.account.id})

        if(result.data.isSuccess){
  
            toast.success("remove successfully")
        }else{
            toast.error("remove failed")
        }
    }
    const handleCloseViewrole =  (e) => {

        props.setShowviewrole(false)

    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        let result = await axios.post(`/api/admin/addrolebyuser`,{id:roleid,userid:props.account.id})
        
        if(result.data.isSuccess){
            console.log(1)
            toast.success("add successfully")
        }else{
            toast.error("add failed")
        }
    }
    useEffect(() => {
        socketRef.current = io.connect(`http://localhost:3001/`)
        socketRef.current.on('reloaduserrole', (args) => {
          refetch()
        })

    }, [])

    if (isLoading) return <>...loading</>
    if (!props.showviewrole) {
        return
    }

    return (
        <>

            <Dialog
                open={props.showviewrole}
                onClose={handleCloseViewrole}
                scroll='paper'
                fullWidth={true}
                maxWidth='md'
            >
                <DialogTitle>Detail</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        tabIndex={-1}
                    >
                        Role of User ID {data.role[0].username} <br />
                        <div className='row' style={{ marginLeft: 20 + "px" }}>
                            {data.role.map((item, i) => {
                                return (<>
                                    <div className='wrap-role'>
                                        <div className='role'>
                                            {item.name}
                                        </div>
                                        <button className='minus-button' onClick={handleDeleteRolebyuser(item.id)} type="">-</button> 
                                    </div>
                                </>)
                            })}
                        </div>

                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <form className="form-addrole" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Select a Role:</label>
                            <select className="form-control " onChange={(e)=>{setroleid(e.target.value)}} id="exampleFormControlSelect1" value={roleid} >
                            <option className="none" defaultValue={true} >None</option >
                                {role.role.map((item, i) => {
                                 
                                    if(!data.role.find((e)=>e.name == item.name)){
                                        return <>
                                        <option key={i} value={item.id} defaultValue={true}>{item.name}</option>
                                    </>
                                    }
                         
                                })}
                            </select>
                        </div>
                        <input type="submit" name="" value="+" />
                    </form>
                    <Button onClick={handleCloseViewrole}>Close</Button>
                </DialogActions>
            </Dialog>

        </>

    );
}

export default View;
