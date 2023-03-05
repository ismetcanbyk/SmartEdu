import express from 'express';
import * as pagerController from '../controllers/pageController.js';

const router = express.Router();


router.route('/').get(pagerController.getIndexPage);
router.route('/about').get(pagerController.getAboutPage);
router.route('/contact').get(pagerController.getContactPage);
router.route('/dashboard').get(pagerController.getDashboardPage);
router.route('/register').get(pagerController.getRegisterPage);

export default router;

