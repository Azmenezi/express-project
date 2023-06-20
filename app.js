const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
app = express();

app.listen(PORT, () => console.log("Server is running on port: ", PORT));