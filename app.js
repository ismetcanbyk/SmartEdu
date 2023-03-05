import express from 'express';
import mongoose from 'mongoose';
import pageRouter from './routes/pageRoute.js';
import courseRouter from './routes/courseRoute.js';
import categoryRouter from './routes/categoryRoute.js'
import userRouter from './routes/userRoute.js'



const app = express();

const port = 3000;

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
    .then(() => {
        console.log("DB Connect Successfuly");
    })
    .catch((err) => {
        console.log(err);
    });


//Template Engine 
app.set("view engine", "ejs");


//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Routes
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`App started on port ${port}.`);
});