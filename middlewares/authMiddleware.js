import User from '../models/User.js';

const authMidllewares = async (req, res, next) => {

    try {
        const user = await User.findById(req.session.userID);

        if (!user) {
            res.redirect('/login');
        }
        next();

    } catch (error) {
        console.log(error);
    }
};


export default authMidllewares;