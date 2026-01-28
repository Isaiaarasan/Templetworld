const Template = require('../models/Template');
const User = require('../models/User');

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find({}).select('-codeContent');
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get template details
// @route   GET /api/templates/:id
// @access  Public
const getTemplateById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id).select('-codeContent');
        if (template) {
            res.status(200).json(template);
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Download template (get code content)
// @route   GET /api/templates/:id/download
// @access  Private
const downloadTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (template) {
            // Add to user's downloaded history if not already there
            const user = await User.findById(req.user.id);
            if (!user.downloadedTemplates.includes(template._id)) {
                user.downloadedTemplates.push(template._id);
                await user.save();
            }

            // Return the code content
            res.status(200).json({ codeContent: template.codeContent });
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a template (Seed/Admin)
// @route   POST /api/templates
// @access  Public (for now, or create separate admin middleware)
const createTemplate = async (req, res) => {
    try {
        const { title, description, category, thumbnailImage, codeContent } = req.body;
        const template = await Template.create({
            title,
            description,
            category,
            thumbnailImage,
            codeContent,
        });
        res.status(201).json(template);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTemplates,
    getTemplateById,
    downloadTemplate,
    createTemplate,
};
