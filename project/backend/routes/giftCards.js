const express = require('express');
const { check } = require('express-validator');
const { getGiftCards, getGiftCard } = require('../controllers/giftCards');

const router = express.Router();

router.get('/', getGiftCards);
router.get('/:id', getGiftCard);

module.exports = router;