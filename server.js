const express = require("express");
const app = express();
const cors = require("cors");

// Importing routes
const userRouter = require("./routes/userRoutes");
const photoRouter = require("./routes/photoRoutes");
const likeRouter = require("./routes/likeRouter"); // Fayl nomiga e’tibor bering

// Middleware
app.use(express.json());
app.use(cors());

// Calling routes
app.use('/', userRouter);
app.use('/photos', photoRouter);
app.use('/likes', likeRouter); // '/likes' bilan chaqirish kerak

// Static files
app.use("/uploads", express.static("uploads"));

const port = 4001;
app.listen(port, () => {
  console.log(`Server ${port}-portda ishladi`);
});
