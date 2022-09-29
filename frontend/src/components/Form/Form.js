import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, modifyPost } from '../../actions/posts';
import useStyles from './styles';

  const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '' , creator : '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, cName: user?.result?.name , cId : user?.result?._id , creator : user?.result?.name }));
    } else {
      dispatch(modifyPost( postData ));
    }
      clear();
  };

  if(!user?.result?.name) {
    return(
        <Paper className={classes.paperAuth}>
            <h2 align="center">
                Veuillez d'abord vous connecter avant d'avoir accès au contenu et de publier ce que vous souhaitez.
            </h2>
        </Paper>
    )
}

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off"  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <h2 >{currentId ? `Modifer "${post.title}"` : 'Créer votre Publication'}</h2>
        <TextField name="title" label="Titre" variant="outlined"  fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required />
        <TextField name="message" variant="outlined" label="Message (160 Caractères max)" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} required />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Publier</Button>
        <Button className={classes.buttonClear} variant="contained"  size="small" onClick={clear} fullWidth>Annuler</Button>
      </form>
    </Paper>
  );
};

export default Form;
