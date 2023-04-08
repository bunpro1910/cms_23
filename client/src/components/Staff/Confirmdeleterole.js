

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
function View( props ) {
    const handledelete = async(e)=>{
        let result = await axios.post(`/staff/deleterole`,{id:props.role.id})
        if(result.data.isSuccess){
          Store.addNotification({
            title: "Delete Success",
            message: `Delete Success`,
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
          props.setShowdelete(false)
        }else{
          Store.addNotification({
            title: "Delete failed",
            message: `Delete failed`,
            type: "danger",
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
            Are you sure delete Role <br/>
            <p>ID: {props.role.id}</p>
            <p>Name: {props.role.name}</p>
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
