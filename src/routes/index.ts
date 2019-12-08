import { Router } from 'express';
import movie from './movie';

const routes = Router();

routes.use('/movies', movie);

export default routes;
