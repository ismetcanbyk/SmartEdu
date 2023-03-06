import User from "../models/User.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            status: "succes",
            user
        });
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
            res.status(200).send('You are logged in');
        } else {
            res.send('Geçersiz');
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }

}


export { createUser, loginUser };