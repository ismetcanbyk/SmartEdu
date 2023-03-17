import express from 'express';
import * as courseController from "../controllers/courseController.js";
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();


router.route('/')
    .get(courseController.getAllCourses)
    .post(roleMiddleware(["teacher", "admin"]), courseController.createCourse);

router.route('/:slug')
    .get(courseController.getCourse)
    .delete(courseController.deleteCourse);

router.route('/enroll')
    .post(courseController.enrollCourse);

router.route('/release')
    .post(courseController.releaseCourse);

export default router;


