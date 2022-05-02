const express = require('express');
const testCtrl = require('../controllers/test.controller');

const router = express.Router();

router.route('/:store/testing')
	.get(testCtrl.testFunction);

module.exports = router;