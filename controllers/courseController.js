import Course from "../models/Course.js";

const createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body);

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

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort('-createdAt');

        res.status(200).render('courses', {
            page_name: "courses",
            courses
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });

        res.status(200).render('course-single', {
            page_name: "courses",
            course
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
};

export { createCourse, getAllCourses, getCourse };