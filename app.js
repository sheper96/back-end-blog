const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/connect')
const dbURI = require('./config')
const { errorHandler } = require('./middleware/erroHandlerMiddleware')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const xss = require("xss-clean");
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');




const app = express();

app.use(express.json()); 
app.use(xss());
app.use(cookieParser());
app.use(helmet());

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/post", postRoutes);

app.use(errorHandler)


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(dbURI);

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};


start();



