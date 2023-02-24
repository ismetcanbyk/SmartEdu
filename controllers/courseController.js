import Course from "../models/Course.js";

const createCourse = async (req, res) => {
    const course = await Course.create(req.body);

    try {
        res.status(201).json({
            status: "success",
            course
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    };
};

export default createCourse;