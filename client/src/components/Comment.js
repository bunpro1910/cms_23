

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
import ReactQuill from 'react-quill';

import HTMLString from 'react-html-string';
function View(props) {
  console.log(props)
  const editorRef = useRef(null);
  let [comment, setcomment] = useState('')
  let getuser = () => axios.get(`/api/comment?id=${props.id}`).then((res) => res.data)
  const socketRef = useRef();
  const handleClosecomment = (e) => {
    props.setshowcomment(false);
  };
  const { isLoading, error, data, isFetching, refetch } = useQuery(['comment', props.id], getuser)
  let handle_submit = (e) => {
    e.preventDefault();
    axios.post(`/api/addcomment`, { comment: comment, time: new Date(), ideaid: props.id })
    setcomment('')
  }
  useEffect(() => {
    socketRef.current = io.connect(`http://localhost:3001/`)
    socketRef.current.on('newcomment', (args) => {
      refetch()
    })
  }, [])
  console.log(comment)
  if (isLoading) { return <></> }
  if (props.id == -1) {
    return <></>
  }
  if (!props.showcomment) {
    return <></>
  }
  console.log(data)




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
              {data.quantity == 0 ? <div className='text-center'>don't have any comment</div> : data.comment.map((item) => {
                return (
                  <>
                    <div className='previous-comment'>
                      <div className='info ql-editor !p-0'>
                        <HTMLString html={item.text}  />
                        {/* <div dangerouslySetInnerHTML={{ __html:  }}></div> */}
                      </div>

                      <p className='date !text-xs'>{new Date(item.datetime).toDateString() + ", " + new Date(item.datetime).getHours() + ":" + new Date(item.datetime).getMinutes()}</p>
                    </div>
                    <hr />
                  </>
                )
              })}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          {new Date() <= new Date(props.finalclosuredate) ? <form onSubmit={handle_submit} className="form-comment">
            <div className='new-comment flex flex-row justify-center items-center relative  '>

              <ReactQuill theme="snow" value={comment} modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                  ['blockquote', 'code-block'],

                  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  [{ 'direction': 'rtl' }],                         // text direction

                  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          
                  [{ 'align': [] }],

                  ['clean']      
                ],
              }} formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image','color','background','size', 'code-block'
              ]} onChange={setcomment} 
                
              />


              {/* <input type='text' placeholder='input comment ' className='input-comment' onChange={(e) => { setcomment(e.target.value) }} value={comment}></input> */}
              <button className='text-4xl ml-2'><AiOutlineSend className='absolute ' style={{right:"30px", bottom:"25px"}} /></button>
            </div>
          </form> : ""}
          <Button onClick={handleClosecomment}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}

export default View;
