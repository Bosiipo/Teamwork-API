import {Router} from 'express';

// Controller
import ArticleController from '../controllers/article.controller';
import AuthController from '../controllers/auth.controller';
import TagController from '../controllers/tag.controller';

const router = Router();

router.post('/create', AuthController.verifyEmployee, TagController.createTag);
router.get('/', AuthController.verifyEmployee, TagController.getAllTags);

export default router;
