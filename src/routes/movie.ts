import { Router } from 'express';
import { Movie } from '../controllers';
import { fetchExternalMovieDetails, validateFields } from '../lib/middleware';
import { movieRules } from '../lib/rules';

const router = Router();

router.get('/', Movie.all);
router.get('/:id', Movie.one);
router.post('/', movieRules.create, validateFields, fetchExternalMovieDetails, Movie.create);
router.delete('/:id', movieRules.delete, validateFields, Movie.remove);

export default router;
