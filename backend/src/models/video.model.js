const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    driveFileId: {
        type: String,
        required: true
    },
    driveFileUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String
    },
    duration: {
        type: Number
    },
    tags: [{
        type: String,
        trim: true
    }],
    fileSize: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
videoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Video', videoSchema);
