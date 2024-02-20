import express from 'express'
import connectToDb from './db/conn.js'
import router from './routers/student.js';

const app = express();
// app.use(express.json());
const port = process.env.PORT || 3000;




// 3. we need to register our router
app.use(router);
// Routes ...............




// db init 
connectToDb();

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})

// You DO NOT NEED express. json() and express.urlencoded
// for GET Requests or DELETE Requests. We only need it for
// post and put req.
// express. json() is a method inbuilt in express to recognize the incoming
// Request Object as a JSON Object. This method is called as a middleware
// in your application using the code: app.use(express.json());