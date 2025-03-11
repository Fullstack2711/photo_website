const express = require("express");
const app = express();
const cors = require("cors");
// Importing routes
const userRouter = require("./routes/userRoutes");
const photoRouter = require("./routes/photoRoutes");
const likeRouter = require("./routes/likeRouter");

// Middleware
app.use(express.json());
app.use(cors());

// Calling routes
app.use('/', userRouter);
app.use('/photos', photoRouter)
app.use('/', likeRouter)

const port = 4000;
app.listen(port, () => {
  console.log(`Server ${port}-portda ishladi`);
});
