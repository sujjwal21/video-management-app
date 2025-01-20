const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const Video = require('../models/video.model');

// Get all videos for the authenticated user with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const tags = req.query.tags ? req.query.tags.split(',') : [];

        let query = { owner: req.user.userId };

        // Add search filter
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Add tags filter
        if (tags.length > 0) {
            query.tags = { $in: tags };
        }

        const videos = await Video.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Video.countDocuments(query);

        res.json({
            videos,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalVideos: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
});

// Add a new video from Google Drive
router.post('/', async (req, res) => {
    try {
        const { title, description, driveFileId, driveFileUrl, tags } = req.body;

        const video = new Video({
            title,
            description,
            driveFileId,
            driveFileUrl,
            tags: tags || [],
            owner: req.user.userId
        });

        // Here you would typically verify the Google Drive file and get additional metadata
        // This is a simplified version - you'll need to implement Google Drive API integration

        await video.save();
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error adding video', error: error.message });
    }
});

// Get a specific video
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findOne({
            _id: req.params.id,
            owner: req.user.userId
        });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error: error.message });
    }
});

// Update a video
router.put('/:id', async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        
        const video = await Video.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.userId },
            { 
                $set: {
                    title,
                    description,
                    tags,
                    updatedAt: Date.now()
                }
            },
            { new: true }
        );

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error updating video', error: error.message });
    }
});

// Delete a video
router.delete('/:id', async (req, res) => {
    try {
        const video = await Video.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.userId
        });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Here you would typically also remove the file from Google Drive
        // This requires Google Drive API integration

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error: error.message });
    }
});

module.exports = router;
