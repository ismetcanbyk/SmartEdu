import bcrypt from 'bcrypt';
import User from "../models/User.js";
import Category from '../models/Category.js'

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login');

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
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
            res.send('Geçersiz');
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    };
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

const getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID });
    const categories = await Category.find();

    res.status(200).render('dashboard', {
        page_name: "dashboard",
        user,
        categories
    });
};

export { createUser, loginUser, logoutUser, getDashboardPage };