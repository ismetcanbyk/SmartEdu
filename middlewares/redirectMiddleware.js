import User from '../models/User.js';

const redirectMidlleware = async (req, res, next) => {

    try {
        const user = await User.findById(req.session.userID);

        if (user) {
            res.redirect('/');
        } else {
            next();
        }


    } catch (error) {
        console.log(error);
    }
};


export default redirectMidlleware;