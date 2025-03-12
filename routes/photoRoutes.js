const express = require("express");
const { getPhotos, addPhoto, deletePhoto, myPhotos } = require("../controllers/photoController");
const { checkToken } = require("../middlewere/check");
const uploadMiddleware = require("../middlewere/uploadsMiddlewere");
const photoRouter = express.Router();

photoRouter.post('/', checkToken,uploadMiddleware ,addPhoto);
photoRouter.get('/', getPhotos);
photoRouter.get('/:userId', checkToken, myPhotos);
photoRouter.delete('/:id', checkToken, deletePhoto);


module.exports = photoRouter   