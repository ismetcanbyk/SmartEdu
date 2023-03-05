import User from "../models/User.js";

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

export { createUser };