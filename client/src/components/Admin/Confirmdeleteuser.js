

import { useRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useQuery } from 'react-query'
import { AiOutlineSend } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Store } from 'react-notifications-component'
import { toast } from 'react-toastify'
function View( props ) {
    const handledelete = async(e)=>{
        let result = await axios.post(`/admin/deleteuser',{id:props.account.id}`)
        if(result.data.isSuccess){
          props.setShowdelete(false)
          toast.success("delete sucessfully")
        }else{
          toast.error("delete failed")
        }
    }
    const handleClosedelete = (e)=>{

        props.setShowdelete(false)
    }
  useEffect(() => {

 
  }, [])
 

  if(!props.showdelete){
    return 
  }
  return (
    <>

      <Dialog
        open={props.showdelete}
        onClose={handleClosedelete}
        scroll='paper'
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            tabIndex={-1}
          >
            Are you sure delete User <br/>
            <p>ID: {props.account.id}</p>
            <p>Fullname: {props.account.fullname}</p>
            <p>Email: {props.account.email}</p>
            <p>Phone: {props.account.phone}</p>
            <p>Department: {props.account.department_name}</p>
      

          </DialogContentText>

        </DialogContent>
        <DialogActions>
              <Button onClick={handleClosedelete}>Cancel</Button>
              <Button onClick={handledelete}>Delete</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}

export default View;
