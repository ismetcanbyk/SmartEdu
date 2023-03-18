import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from "../models/User.js";
import Category from '../models/Category.js';
import Course from '../models/Course.js';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login');

    } catch (error) {
        const errors = validationResult(req);
        console.log(errors.array()[0].msg);

        for (let i = 0; i < errors.array().length; i++) {

            req.flash("error", ` ${errors.array()[i].msg}`);
        }

        res.status(400).redirect('/register');
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        let same = await bcrypt.compare(password, user.password);
        if (same) {
            req.session.userID = user._id;
            res.status(200).redirect('/');
        } else {
            req.flash("error", "Your password is not correct !");
            res.status(400).redirect('/login');
        }

    } catch (error) {
        req.flash("error", "User is not exist !");
        res.status(400).redirect('/login');
    };
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};


const getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    const users = await User.find({});

    res.status(200).render('dashboard', {
        page_name: "dashboard",
        user,
        categories,
        courses,
        users
    });
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        await Course.deleteMany({ user: req.params.id });

        res.status(200).redirect('/users/dashboard');

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        });
    };
};



export { createUser, loginUser, logoutUser, getDashboardPage, deleteUser };