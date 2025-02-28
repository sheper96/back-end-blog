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

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: "GET, POST, PUT, DELETE", 
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization , Access-Control-Allow-Origin",
  credentials: true, 
}));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/post", postRoutes);

app.use(errorHandler)


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(dbURI);

    app.listen(port,"0.0.0.0", () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};


start();



