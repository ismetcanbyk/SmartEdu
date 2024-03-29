import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import * as dotenv from 'dotenv';
import methodOverride from 'method-override';
import pageRouter from './routes/pageRoute.js';
import courseRouter from './routes/courseRoute.js';
import categoryRouter from './routes/categoryRoute.js'
import userRouter from './routes/userRoute.js'


dotenv.config();

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

//Global Veriables
global.userIN = null;


//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);


//Routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`App started on port ${port}.`);

});