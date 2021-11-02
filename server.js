import express from "express";
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import contactFormAPI, {transporter} from './api/contact.js';
import testAPI from "./api/test.js";

const app = express();
const port = process.env.PORT || 5001;
dotenv.config();

// var corsOptions = {
//   origin: `http://localhost:8081"`
// };

// app.use(cors(corsOptions));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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


app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});