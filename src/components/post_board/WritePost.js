import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import axios from 'axios';

export default function WritePost(props) {
  const [newPost, setNewPost] = React.useState({
    TITLE: '',
    WRITER: '',
    W_DATE: props.date,
    CONTENT: ''
  });

  const textHandle = (e) => {
    setNewPost({...newPost, [e.target.name]:e.target.value});
  }

  const writePost = async() => {
    await axios.post('insertPost', {post: newPost}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    props.close();
    props.loadRows();
  }

  return (
    <>
      <DialogTitle sx={{ mt: 1 }}>
        게시글 쓰기
      </DialogTitle>
      <DialogContent>
        <TextField 
          sx={{ mt: 0 }}
          id="standard-basic" 
          label="Title" 
          variant="standard"
          onChange={textHandle}
          fullWidth
          margin="dense"
          value={newPost.title}
          name="TITLE"
        />
        <TextField
          id="standard-basic"
          label="name"
          variant="standard"
          onChange={textHandle}
          fullWidth
          margin="dense"
          value={newPost.WRITER}
          name="WRITER"
        />
        <TextField
          id="standard-multiline-static"
          label="Content"
          multiline
          rows={10}
          variant="standard"
          onChange={textHandle}
          fullWidth
          margin="dense"
          value={newPost.CONTENT}
          name="CONTENT"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close}>취소</Button>
        <Button onClick={writePost} autoFocus>
          등록
        </Button>
      </DialogActions>
    </>
  )
}