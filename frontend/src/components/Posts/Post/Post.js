import React from 'react';
import { Card, CardActions, CardMedia, Button } from '@material-ui/core/';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';


import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import 'moment/locale/fr' 
moment.locale('fr')

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {

      return post.likes.find((like) => like === ( user?.result?._id))
        ? (
          <><ThumbUpIcon fontSize="medium" />&nbsp;{post.likes.length >= 2 ? `Vous et ${post.likes.length - 1} autres` : `${post.likes.length} J'aime${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOutlined fontSize="medium" />&nbsp;{post.likes.length} {post.likes.length === 1 ? "J'aime" : "J'aimes"}</>
        );
    }

    return <><ThumbUpOutlined fontSize="medium" />&nbsp;J'aime</>;
  };

  return (
    <Card className={classes.card} raised>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <h3>{post.creator}</h3>
        <h4>{moment(post.createdAt).fromNow()}</h4>
      </div>
      {(user?.result?._id === post?.cId || user?.result?.isAdmin) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <EditIcon fontSize="medium" />
        </Button>
      </div>
      )}
      <h2 className={classes.title}>{post.title}</h2>
        <h4 className={classes.message}>{post.message}</h4>
      <CardActions className={classes.cardActions}>
        <Button size="medium" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id , user ))}>
          <Likes />
        </Button>
        {( user?.result?._id === post?.cId || user?.result?.isAdmin) && (
        <Button size="large" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="large" />
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
