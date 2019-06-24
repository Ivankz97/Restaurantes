import { Router } from 'express';
import { createVacancy, getVacancies, updateVacancy, deleteVacancy, getOneVacancy, getVacancyByRestaurant } from '../controllers/vacancy.controller';


const router = Router();

router.post('/new-vacancy', createVacancy);
router.get('/', getVacancies);
router.put('/:id', updateVacancy);
router.delete('/:id', deleteVacancy);
router.get('/:id', getOneVacancy);
router.get('/restaurant/:restaurant_id', getVacancyByRestaurant);

export default router;