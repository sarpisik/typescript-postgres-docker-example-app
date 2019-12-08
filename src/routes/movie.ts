import { Router } from 'express';
import { Movie } from '../controllers';

const router = Router();

router.get('/', Movie.all);

export default router;
