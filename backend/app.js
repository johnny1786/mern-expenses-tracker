const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddlewaree');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const app = express();




//!Connect to mongodb
mongoose
.connect("mongodb://localhost:27017/mern-expenses")
.then(()=> console.log("DB connected"))
.catch((e) => console.log(e));



//!cors config
const corsOptions = {
  origin:["http://localhost:5173"],
}
app.use(cors(corsOptions));

//!Middleware
app.use(express.json()); // for parsing application/json

//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//!Error handling middleware
app.use(errorHandler);




//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});