const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./database");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const moviesRoutes = require("./api/movies/routes");
//declare
const PORT = process.env.PORT;
app = express();
app.use(express.json());
connectDB();

//
app.use("/media/", express.static(path.join(__dirname, "media")));
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/movies", moviesRoutes);

//middleware
app.use(notFound);
app.use(errorHandler);

//listner
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
