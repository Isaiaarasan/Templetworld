const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    downloadedTemplates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
