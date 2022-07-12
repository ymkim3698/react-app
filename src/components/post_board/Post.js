import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import axios from 'axios';

export default function Post(props) {
  const [post, setPost] = React.useState({});
  const [postEditMode, setPostEditMode] = React.useState(false);

  const changePostMode = () => {
    setPostEditMode(postEditMode ? false : true);
  }

  const textHandle = (e) => {
    setPost({...post, [e.target.name]:e.target.value});
  }

  const deletePost = async() => {
    await axios.post('deletePost', {ID_NUM: post.ID_NUM}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    props.close();
    props.loadRows();
  }

  const updatePost = async() => {
    await axios.post('updatePost', {post: post, date: props.date}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    props.close();
    props.loadRows();
  }

  const loadPost = async() => {
    await axios.post('selectPost', {ID_NUM: props.ID_NUM}).then(res => {
      console.log(res.data[0]);
      setPost(res.data[0]);
    }).catch(err => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    loadPost();
  }, []);

  return (
    <>
      <DialogTitle sx={{ mt: 1 }}>
        {postEditMode && 
          <TextField 
            id="standard-basic"
            label="Title" 
            variant="standard"
            onChange={textHandle}
            fullWidth
            margin="dense"
            value={post.TITLE || ''}
            InputProps={{
              readOnly: postEditMode ? false : true,
            }}
            name="TITLE"
          />
        }
        {!postEditMode &&
          post.TITLE
        }
      </DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="name"
          variant="standard"
          onChange={textHandle}
          fullWidth
          margin="dense"
          value={post.WRITER || ''}
          InputProps={{
            readOnly: postEditMode ? false : true,
          }}
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
          value={post.CONTENT || ''}
          InputProps={{
            readOnly: postEditMode ? false : true,
          }}
          name="CONTENT"
        />
        <p style = {{margin:'10px 0 0 0'}}>{post.W_DATE || ''}</p>
      </DialogContent>
      <DialogActions>
        {!postEditMode &&
          <>
            <Button onClick={deletePost}>삭제</Button>
            <Button onClick={changePostMode} autoFocus>
              수정
            </Button>
          </>
        }
        {postEditMode &&
          <>
            <Button onClick={props.close}>취소</Button>
            <Button onClick={updatePost} autoFocus>
              저장
            </Button>
          </>
        }
      </DialogActions>
    </>
  )
}