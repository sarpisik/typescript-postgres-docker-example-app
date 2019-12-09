import { Router } from 'express';
import { Movie } from '../controllers';
import { fetchExternalMovieDetails, validateFields } from '../lib/middleware';
import { movieRules } from '../lib/rules';

const router = Router();

router.get('/', Movie.all);
router.post(
  '/',
  movieRules.create,
  validateFields,
  fetchExternalMovieDetails,
  Movie.create
);
router.delete('/', movieRules.delete, validateFields, Movie.remove);

export default router;
