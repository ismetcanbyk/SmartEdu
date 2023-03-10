import express from 'express';
import * as pagerController from '../controllers/pageController.js';
import redirectMidlleware from '../middlewares/redirectMiddleware.js';

const router = express.Router();


router.route('/').get(pagerController.getIndexPage);
router.route('/about').get(pagerController.getAboutPage);
router.route('/contact').get(pagerController.getContactPage);
router.route('/register').get(redirectMidlleware, pagerController.getRegisterPage);
router.route('/login').get(redirectMidlleware, pagerController.getLoginPage);

export default router;

