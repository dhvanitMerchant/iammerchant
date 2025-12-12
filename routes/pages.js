const router = require('express').Router();
const PagesController = require('../controllers/pagesController');

router.get('/', PagesController.show);
router.post('/sendFeedback', PagesController.create);

module.exports = router;
