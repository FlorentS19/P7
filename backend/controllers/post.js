const PostModel = require('../models/Post');
const req_token = require('../middleware/auth');
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
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    posterId: req.body.posterId,
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
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json('ID Unknown : ' + req.params.id);
} else {
    const updatedRecord = {
        message: req.body.message
    }
    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (error, docs) => {
            if (!error) {
                res.send(docs);
            } else {
                console.log("Update error : " + error);
            }
        }
    )
}
};

exports.deletePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json('ID Unknown : ' + req.params.id);
  } else {
    PostModel.findOne({ _id : req.params.id})
    .then((post) => {
        if (!post) {
            res.status(404).json({error: new Error('Post non trouvé !')});
          }
        const filename = post.picture.split('/images/')[1];
        
        fs.unlink(`./images/${filename}`, () => {
            PostModel.deleteOne({ _id: req.params.id }) 
                .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                .catch(error => res.status(400).json({ error }));
        });
    })
}
};

exports.likePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json('ID Unknown : ' + req.params.id);
  } else {
      try {
          await PostModel.findByIdAndUpdate(
              req.params.id,
              {
                  $addToSet: { likers: req.body.id }
              },
              { new : true },
          );
          await UserModel.findByIdAndUpdate(
              req.body.id,
              {
                  $addToSet: { likes: req.params.id}
              },
              { new : true },
          )
          return res.status(200).send('OK');
      }
      catch (error) {
          console.log(error)
          return res.status(400).send(error);
      }
  }
}

exports.unLikePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json('ID Unknown : ' + req.params.id);
  } else {
      try {
          await PostModel.findByIdAndUpdate(
              req.params.id,
              {
                  $pull: { likers: req.body.id }
              },
              { new : true },
          );
          await UserModel.findByIdAndUpdate(
              req.body.id,
              {
                  $pull: { likes: req.params.id}
              },
              { new : true },
          )
          return res.status(200).send('OK');
      }
      catch (error) {
          return res.status(400).send(error);
      }
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