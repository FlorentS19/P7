const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://'+ process.env.MONGODB_USERNAME+':'+ process.env.MONGODB_PASSWORD+'@'+ process.env.MONGODB_CLUSTER_NAME+'.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));