import Course from "../models/Course.js";
import Category from "../models/Category.js";

const createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body);

        res.status(201).redirect('/courses');
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    };
};

const getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;

        const category = await Category.findOne({ slug: categorySlug });

        let filter = {};

        if (categorySlug) {
            filter = { category: category._id };
        }


        const courses = await Course.find(filter).sort('-createdAt');
        const categories = await Category.find();

        res.status(200).render('courses', {
            page_name: "courses",
            courses,
            categories
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