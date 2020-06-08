import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes
    .get('/items', itemsController.index);

routes
    .post(
        '/points', 
        upload.single('image'),  
        celebrate(
            {
                body: Joi.object().keys({
                    name: Joi.string().required(),
                    email: Joi.string().required().email(),
                    whatsapp: Joi.string().required(),
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required(),
                    city: Joi.string().required(),
                    uf: Joi.string().required().max(2),
                    items: Joi.string().required(),
                })
            },
            {
                abortEarly: false
            }
        ),
        pointsController.create)
    .get('/points', pointsController.index)
    .get('/points/:id', pointsController.show)

export default routes;
