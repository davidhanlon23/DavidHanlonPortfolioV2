import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';

import contactFormAPI, {transporter} from './api/contact.js';
import testAPI from "./api/test.js";

const app = express();
const port = process.env.PORT || 5001;
dotenv.config();

// var corsOptions = {
//   origin: `http://localhost:8081"`
// };

app.use(cors());

// Bodyparser middleware
app.use(
  express.urlencoded()
);
app.use(express.json());

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log('Verify Error Message:', error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

//Routes
app.use('/api', contactFormAPI);
app.use('/api', testAPI);

// app.use(express.static('public'));
// app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });
app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});