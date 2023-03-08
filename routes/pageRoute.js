import express from 'express';
import * as pagerController from '../controllers/pageController.js';

const router = express.Router();


router.route('/').get(pagerController.getIndexPage);
router.route('/about').get(pagerController.getAboutPage);
router.route('/contact').get(pagerController.getContactPage);
router.route('/register').get(pagerController.getRegisterPage);
router.route('/login').get(pagerController.getLoginPage);

export default router;

