const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
 

const {Genre } = require('../models/genre'); 

const {Movie, validate} = require('../models/movie'); 
// async function createMovie(title, genres) {
//     const movies = new Movie({
//         title,
//         genres
//     });
//     movies.save();
//     console.log(movies);

// }

//createMovie('the croods',new Genre ({'name':'sci-fi'}));



router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    let movie = new Movie({ title: req.body.title,genres:{_id:genre._id,
        name:genre.name},numberInStock:req.body.numberInStock,dailyRentalRate:req.body.dailyRentalRate});
    movie = await movie.save();

    res.send(movie);
});
// modify these 
router.put('/:id', async (req, res) => {
    const { error } = validatemovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movies.findByIdAndUpdate(req.params.id, { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone }, {
        new: true
    });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});




module.exports = router; 