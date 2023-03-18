import Category from "../models/Category.js";
import Course from "../models/Course.js";

const addCategoryPage = (req, res) => {
    try {
        res.status(200).render('addCategoryPage', {
            page_name: "courses"
        });
    } catch (error) {

    }
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(201).redirect('/users/dashboard');

    } catch (err) {
        res.status(400).json({
            status: "fail",
            err
        });
    }
};


const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id);

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    };
};


export { addCategoryPage, createCategory, deleteCategory };