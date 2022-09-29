const PostModel = require('../models/Post');
const UserModel = require("../models/User");
const fs = require('fs');

exports.readPost = (req, res, next) => {
  PostModel.find((error, docs) => {
      if(!error) {
          res.send(docs);
      } else {
          console.log('Error to get data :' + error);
      }
  }).sort({ createdAt: -1 });
}

exports.createPost = (req, res, next) => {
  //const postObject = JSON.parse(req.body.post);
  //delete postObject._id;
  const post = new PostModel({
    userId: req.body.userId,
    message: req.body.message,
    picture: req.file !== undefined ? `${req.protocol}://${req.get("host")}/images/${file}`:"",
    video: req.body.video,
    likers: [],
    comments: [],
  });
  if (post.userId === req.token.userId) {
    post.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  } else {
      res.status(401).json({ error: "userId non valable" });
  }
};

exports.modifyPost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const postObject = req.file ?
        {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        if (UserModel.userId === PostModel.userId) {
          PostModel.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
        } else {
            res.status(401).json({ error: "vous n'êtes pas autorisé à modifier cette sauce" });
        }
      })
    .catch(error => res.status(500).json({ error }));  
};

exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id : req.params.id})
  .then((post) => {
    if (PostModel.userId === req.token.userId) {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        PostModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    } else {
      res.status(401).json({ error: "vous n'êtes pas autorisé à supprimer cette sauce" });
    }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let postId = req.params.id
  
  switch (like) {
    case 1 :
      PostModel.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
          .then(() => res.status(200).json({ message: `J'aime` }))
          .catch((error) => res.status(400).json({ error }))
            
      break;

    case 0 :
      PostModel.findOne({ _id: postId })
           .then((post) => {
            if (post.usersLiked.includes(userId)) { 
              PostModel.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;
  }
}

exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
              commenterId: req.body.commenterId,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
          },
        },
      },
      { new: true })
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
      return res.status(400).send(err);
  }
};

exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};