import { Router } from 'express';
import movie from './movie';
import comment from './comment';

const routes = Router();

routes.use('/movies', movie);
routes.use('/comments', comment);

export default routes;
