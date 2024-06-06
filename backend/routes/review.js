const express = require('express');
const reviewRouter = express.Router();
const Review = require('../model/review');
const User = require('../model/user');

// Add a new review
reviewRouter.post('/add', async (req, res) => {
    const { userName, rating, itemId, description } = req.body;
    try {
        const existingReview = await Review.findOne({ userName, itemId }); 
        if (existingReview) {
            return res.status(400).send('User has already reviewed this item');
        }
        const review = new Review({ userName, rating, itemId, description });
        await review.save();
        res.status(201).send('Review added successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update an existing review
reviewRouter.put('/update', async (req, res) => {
    const { userName, rating, itemId, description } = req.body;
    try {
        const review = await Review.findOne({ userName, itemId });
        if (!review) {
            return res.status(404).send('Review not found');
        }
        review.rating = rating;
        review.description = description;
        await review.save();
        res.status(200).send('Review updated successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete a review
reviewRouter.delete('/delete', async (req, res) => {
    const { userName, itemId } = req.body;
    try {
        const review = await Review.findOneAndDelete({ userName, itemId });
        if (!review) {
            return res.status(404).send('Review not found');
        }
        res.status(200).send('Review deleted successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get reviews for a brewery
reviewRouter.get('/brewery/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
        const reviews = await Review.find({ itemId });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = reviewRouter;
