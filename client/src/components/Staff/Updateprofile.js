

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'
import { useQuery } from 'react-query'
import Updateprofile from './Updateprofile'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
function Home({ user, showupdate, setshowupdate }) {
    const handleClose = (e) => {
        setshowupdate(false)
    }
   
    const [updateform,setupdateform] = useState(user)
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(updateform)
        let result = await axios.post('/staff/updateprofile',updateform)
        if(result.data.isSuccess) {
            toast.success(`${result.data.message}`)
        }else{
            toast.error(`${result.data.message}`)
        }
    }
    console.log(updateform)
    return (
        <>
            <Dialog
                open={showupdate}
                onClose={handleClose}
                scroll='paper'
                fullWidth={true}
                maxWidth='md'
            >
                <DialogTitle>Update profile</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        tabIndex={-1}
                    >
                        <form className='form-manager' onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="" class="form-label">Full name</label>
                                <input type="text" onChange={(e) => { updateform.fullname = e.target.value; setupdateform({ ...updateform }) }} value={updateform.fullname} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Gmail</label>
                                <input type="text" onChange={(e) => { updateform.email = e.target.value; setupdateform({ ...updateform }) }} value={updateform.email} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Phone </label>
                                <input type="text" onChange={(e) => { updateform.phone = e.target.value; setupdateform({ ...updateform }) }} value={updateform.phone} class="form-control" />
                            </div>
                            <button type="submit" class="btn bg-green-400 hover:bg-green-500">Submit</button>
                        </form>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <button class="btn btn-danger"onClick={handleClose}>Cancel</button>

                </DialogActions>
            </Dialog>

        </>
    );
}

export default Home;
