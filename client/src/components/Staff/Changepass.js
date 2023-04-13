

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
function Home({ user, showchange, setshowchange }) {
    const handleClose = (e) => {
        setshowchange(false)
    }

    const [updateform, setupdateform] = useState({ id: user.id, oldpass: '', newpass: '', confirmpass: '' })
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(updateform)
        let result = await axios.post('/api/staff/changepass', updateform)
        if (result.data.isSuccess) {
            toast.success(`${result.data.message}`)
            setshowchange(false)
            setupdateform({ id: user.id, oldpass: '', newpass: '', confirmpass: '' })
        } else {
            toast.error(`${result.data.message}`)
        }
    }
    console.log(updateform)
    return (
        <>
            <Dialog
                open={showchange}
                onClose={handleClose}
                scroll='paper'
                fullWidth={true}
                maxWidth='md'
            >
                <DialogTitle>Change pass</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        tabIndex={-1}
                    >
                        <form className='form-manager' onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="" class="form-label">Old pass</label>
                                <input type="text" onChange={(e) => { updateform.oldpass = e.target.value; setupdateform({ ...updateform }) }} value={updateform.oldpass} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">New Pass</label>
                                <input type="password" onChange={(e) => { updateform.newpass = e.target.value; setupdateform({ ...updateform }) }} value={updateform.newpass} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Confirm Pass </label>
                                <input type="password" onChange={(e) => { updateform.confirmpass = e.target.value; setupdateform({ ...updateform }) }} value={updateform.confirmpass} class="form-control" />
                            </div>
                            <button type="submit" class="btn bg-rose-500 hover:bg-[#e11d48] hover:text-white">Submit</button>
                        </form>
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <button class="btn  bg-rose-500 hover:bg-[#e11d48] hover:text-white" onClick={handleClose}>Cancel</button>

                </DialogActions>
            </Dialog>

        </>
    );
}

export default Home;
