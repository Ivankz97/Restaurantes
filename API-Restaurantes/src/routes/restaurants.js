import { Router } from 'express';
import { createRestaurant, getRestaurants, getOneRestaurant, deleteRestaurant, updateRestaurant } from '../controllers/restaurant.controller';
const router = Router();


// api/restaurants
router.post('/new-restaurant', createRestaurant);
router.get('/', getRestaurants);
router.get('/:id', getOneRestaurant);
router.delete('/:id', deleteRestaurant);
router.put('/:id', updateRestaurant);

export default router;