import express from 'express';
import createCourse from "../controllers/courseController.js";

const router = express.Router();


router.route('/').post(createCourse);

export default router;


