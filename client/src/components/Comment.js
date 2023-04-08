

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

function View(props) {
  console.log(props)
  let [comment, setcomment] = useState('')
  let getuser = () => axios.get(`/api/comment?id=${props.id}`).then((res) => res.data)
  const socketRef = useRef();
  const handleClosecomment = (e) => {
    props.setshowcomment(false);
  };
  const { isLoading, error, data, isFetching, refetch } = useQuery(['comment', props.id], getuser)
  let handle_submit = (e) => {
    e.preventDefault();
    axios.post(`/addcomment`, { comment: comment, time: new Date(), ideaid: props.id })
    setcomment('')
  }
  useEffect(() => {
    socketRef.current = io.connect(`/`)
    socketRef.current.on('newcomment', (args) => {
      refetch()
    })
  }, [])
  if (isLoading) { return <></> }
  if (props.id == -1) {
    return <></>
  }
  if (!props.showcomment) {
    return <></>
  }
  console.log(data)
  if (data.quantity == 0) {


    return (


      <>
        <Dialog
          open={props.showcomment}
          onClose={handleClosecomment}
          scroll='paper'

          fullWidth={true}
          maxWidth='md'
        >
          <DialogTitle>Comment</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText

              tabIndex={-1}
            >
              <div className='comment-page'>
                {data.comment}


              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            { new Date()<=new Date(props.finalclosuredate) ? <form onSubmit={handle_submit} className="form-comment">
              <div className='new-comment'>
                <input type='text' placeholder='input comment' className='input-comment' onChange={(e) => { setcomment(e.target.value) }} value={comment}></input>
                <button className='btn-send'><AiOutlineSend /></button>
              </div>
            </form> : ""}

            <Button onClick={handleClosecomment}>Cancel</Button>

          </DialogActions>
        </Dialog>
      </>

    )
  }
  return (
    <>

      <Dialog
        open={props.showcomment}
        onClose={handleClosecomment}
        scroll='paper'

        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle>Comment</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText

            tabIndex={-1}
          >
            <div className='space-y-4 '>
              {data.comment.map((item) => {
                return (
                  <>
                    <div className='previous-comment'>
                      <div className='info'>
                        <p>{item.text}</p>
                      </div>

                      <p className='date !text-xs'>{new Date(item.datetime).toDateString()+", "+new Date(item.datetime).getHours()+":"+new Date(item.datetime).getMinutes()}</p>
                    </div>
                    <hr />
                  </>
                )
              })}



            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        {new Date()<=new Date(props.finalclosuredate) ? <form onSubmit={handle_submit} className="form-comment">
              <div className='new-comment flex flex-row justify-center items-center  '>
              <input type='text' placeholder='input comment ' className='input-comment' onChange={(e) => { setcomment(e.target.value) }} value={comment}></input>
              <button className='text-4xl ml-2'><AiOutlineSend className='' /></button>
              </div>

            </form> : ""}
          <Button onClick={handleClosecomment}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}

export default View;
