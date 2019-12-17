import { Router } from 'express';
import movie from './movie';
import comment from './comment';
import home from './home';

const routes = Router();

routes.use('/', home);
routes.use('/movies', movie);
routes.use('/comments', comment);

export default routes;
