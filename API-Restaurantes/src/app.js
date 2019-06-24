import express, { json } from 'express';
import morgan from 'morgan';


// Importando routes
import restaurantRoutes from './routes/restaurants';
import vacancyRoutes from './routes/vacancies';
import userRoutes from './routes/users';

// Inicialización
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(json());


// Routes
app.use( '/api/restaurants', restaurantRoutes);
app.use('/api/vacancies', vacancyRoutes);
app.use('/api/user', userRoutes);


export default app;