import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="standard-basic" 
          label="Title" 
          variant="standard"
          onChange={textHandle}
          value={newPost.title}
          name="TITLE"
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          onChange={textHandle}
          value={newPost.WRITER}
          name="WRITER"
        />
      </Box>
      <p style = {{margin:'0'}}>{newPost.W_DATE || ''}</p>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '65ch' },
        }}
        noValidate
        autoComplete="off"
      >
          <TextField
            id="standard-multiline-static"
            label="Content"
            multiline
            rows={10}
            variant="standard"
            onChange={textHandle}
            value={newPost.CONTENT}
            name="CONTENT"
          />
      </Box>
      <DialogActions>
        <Button onClick={props.close}>취소</Button>
        <Button onClick={writePost} autoFocus>
          등록
        </Button>
      </DialogActions>
    </>
  )
}