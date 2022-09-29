const UserModel = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


exports.signup = (req, res) => {
  // Valider les paramètres de la requète
  let email = req.body.email;
  let pseudo = req.body.pseudo;
  let password = req.body.password;

  if (email == null || pseudo == null || password == null) {
      res.status(400).json({ error: 'il manque un paramètre' })
  }
    UserModel.findOne({
      attributes: ['email'],
      where: { email: email }
  })
      .then(user => {
          if (!user) {
              bcrypt.hash(password, 10, function (err, bcryptPassword) {
                  // Création de l'user
                  const newUser = UserModel.create({
                      email: email,
                      pseudo: pseudo,
                      password: bcryptPassword,
                      isAdmin: false
                  })
                      .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                      .catch(err => {
                          res.status(500).json({ err })
                      })
              })
          }
          else {
              res.status(409).json({ error: 'Cette utilisateur existe déjà ' })
          }
      })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  let pseudo = req.body.pseudo;
  let password = req.body.password;
  if (pseudo == null || password == null) {
      res.status(400).json({ error: 'Il manque un paramètre' })
  }

  UserModel.findOne({ where: { pseudo: pseudo } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: '24h' }
              ),
              isAdmin: user.isAdmin
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};
exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".jpg";
  try {
    if (fs.existsSync(filesDestination)) {
      fs.unlink(fileName, (err) => {
        if(err) console.log(err);
      });}
      await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: req.file !== undefined ? `./images/` + req.file.filename : "" } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};