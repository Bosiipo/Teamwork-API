import { Router } from 'express';

// Controller
import ArticleController from '../controllers/article.controller';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.get(
  '/',
  AuthController.verifyEmployee,
  ArticleController.fetchAllArticles
);
router.get('/:id', AuthController.verifyEmployee, ArticleController.getArticle);
router.post(
  '/',
  AuthController.verifyEmployee,
  ArticleController.createArticle
);
router.put(
  '/:id',
  AuthController.verifyEmployee,
  ArticleController.editArticle
);
router.delete(
  '/:id',
  AuthController.verifyEmployee,
  ArticleController.deleteArticle
);
router.post(
  '/:id/comment',
  AuthController.verifyEmployee,
  ArticleController.addComment
);

export default router;
