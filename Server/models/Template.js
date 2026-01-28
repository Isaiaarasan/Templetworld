const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnailImage: {
        type: String, // URL to the image
        required: true,
    },
    codeContent: {
        type: mongoose.Schema.Types.Mixed, // Can be an object structure or stringified code
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Template', templateSchema);
