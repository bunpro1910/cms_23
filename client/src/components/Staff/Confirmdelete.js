

import { useRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

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
import { toast } from 'react-toastify';
function View( props ) {
    const handledelete = async(e)=>{
        let result = await axios.post(`/api/staff/deletecate`,{id:props.category.id})
        if(result.data.isSuccess){
          toast.success(`Delete Success`)
          props.setshowdelete(false)
        }else{
          toast.error(`delete failed`)
        }
    }
    const handleClosedelete = (e)=>{

        props.setshowdelete(false)
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
            Are you sure delete category <br/>
            <p>ID: {props.category.id}</p>
            <p>Name: {props.category.name}</p>
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
