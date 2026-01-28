const express = require('express');
const router = express.Router();
const {
    getTemplates,
    getTemplateById,
    downloadTemplate,
    createTemplate,
} = require('../controllers/templateController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTemplates);
router.post('/', createTemplate); // Ideally protect this for admin
router.get('/:id', getTemplateById);
router.get('/:id/download', protect, downloadTemplate);

module.exports = router;
