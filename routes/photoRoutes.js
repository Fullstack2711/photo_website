const express = require("express");
const { getPhotos, addPhoto, deletePhoto, myPhotos } = require("../controllers/photoController");
const { checkToken } = require("../middlewere/check");
const photoRouter = express.Router();

photoRouter.post('/', checkToken, addPhoto);
photoRouter.get('/',   getPhotos);
photoRouter.get('/:userId', checkToken, myPhotos);
photoRouter.delete('/:id', checkToken, deletePhoto);

module.exports = photoRouter;