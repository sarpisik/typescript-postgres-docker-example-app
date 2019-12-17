import { Router } from 'express';
import { Comment } from '../controllers';
import { validateFields } from '../lib/middleware';
import { commentRules } from '../lib/rules';

const router = Router();

router.get('/', Comment.all);
router.get('/:id', Comment.one);
router.post('/', commentRules.create, validateFields, Comment.create);
router.delete('/:id', commentRules.delete, validateFields, Comment.remove);

export default router;
