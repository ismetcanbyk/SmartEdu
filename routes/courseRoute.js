import express from 'express';
import * as courseController from "../controllers/courseController.js";

const router = express.Router();


router.route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createCourse);

router.route('/:slug')
    .get(courseController.getCourse);


export default router;


