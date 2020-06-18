const express = require('express');
const MoviesService = require('../services/movies');
const validationHandler = require('../utils/middleware/validationHandler');
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/models/movies');

function moviesApi(app) {
    const ruoter = express.Router();
    app.use('/api/movies/', ruoter);

    const moviesServices = new MoviesService()

    ruoter.get('/', async (req, res, next) => {
        const {tags} = req.query
        try {
            const movies = await moviesServices.getMovies({tags})
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            next(error)
        }
    })

    ruoter.get('/:movieId', validationHandler({movieId: movieIdSchema}, 'params') ,async (req, res, next) => {
        const {movieId} = req.params
        try {
            const movies = await moviesServices.getMovie({movieId})
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            })
        } catch (error) {
            next(error)
        }
    })

    ruoter.post('/', validationHandler(createMovieSchema) ,async (req, res, next) => {
        const {body: movie}  = req
        try {
            const createdMovieId = await moviesServices.createMovie({movie})
            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            })
        } catch (error) {
            next(error)
        }
    })

    ruoter.put('/:movieId', validationHandler({movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema),  async (req, res, next) => {
        const {movieId} = req.params
        const {body: movie}  = req
        
        try {
            const updatedMovieId = await moviesServices.updateMovie({movieId, movie})
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch (error) {
            next(error)
        }
    })

    ruoter.delete('/:movieId', validationHandler({movieId: movieIdSchema}, 'params'), async (req, res, next) => {
        const {movieId} = req.params

        try {
            const deletedMovieId = await moviesServices.deleteMovie({movieId})
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi