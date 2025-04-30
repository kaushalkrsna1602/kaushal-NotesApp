const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoutes.js")
const noteRoutes = require("./routes/notesRoutes.js")


const { connectDB } = require('./lib/db.js');

dotenv.config();
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,               
  'https://kaushal-notes-app.vercel.app/',
      
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins, credentials: true }));

app.use("/auth" , authRoutes)
app.use("/note" , noteRoutes)


app.listen(process.env.PORT, () => {
    connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});

