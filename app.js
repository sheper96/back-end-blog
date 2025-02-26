const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/connect')
const dbURI = require('./config')
const bodyParser = require('body-parser');
const {errorHandler} = require('./middleware/erroHandlerMiddleware')
// const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
//const cookieParser = require('cookie-parser');



const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/post", postRoutes);



// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

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
  


