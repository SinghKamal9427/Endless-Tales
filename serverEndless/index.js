import express from "express";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './db/conifg.js'

dotenv.config();
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express();

/* When using ECMAScript modules (ESM) in Node.js, the __dirname variable is not available by default in the module scope. */
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

/* Make sure you have the following line in your Express app to serve static files [To run link in browser like images] */
app.use('/uploads' , express.static('uploads'))

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use("/" , userRouter)

app.get('*', (req, res) => {
  res.sendFile( "views/errors/error.html",{root:"./"});
});

app.listen(PORT, async() => {
  try {
		const { connection } = await connectDB(MONGO_URI);
		console.log("connected with the database of '" + connection.name + "'");
	} catch (error) {
		console.log("error in making database connection");
	}
  console.log("Port in running");

});
