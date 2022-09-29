const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');


router.get('/', auth, postCtrl.readPost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.patch('/likePost/:id',auth, postCtrl.likePost);
//router.patch('/unlikePost/:id',auth, postCtrl.unLikePost);

router.patch('/commentPost/:id',auth, postCtrl.commentPost);
router.patch('/editCommentPost/:id',auth, postCtrl.editCommentPost);
router.patch('/deleteCommentPost/:id',auth, postCtrl.deleteCommentPost);

module.exports = router;