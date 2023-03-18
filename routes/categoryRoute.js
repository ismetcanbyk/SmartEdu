import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.route('/')
    .get(categoryController.addCategoryPage)
    .post(categoryController.createCategory);

router.route('/:id')
    .delete(categoryController.deleteCategory);

export default router;
