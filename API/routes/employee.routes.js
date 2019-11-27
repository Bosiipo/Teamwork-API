import { Router } from 'express';

// controller
import EmployeeController from '../controllers/employee.controller';
import AuthController from '../controllers/auth.controller';
import ArticleController from '../controllers/article.controller';

const router = Router();

router.post('/login', EmployeeController.loginEmployee);
router.post(
  '/create-article',
  AuthController.verifyEmployee,
  ArticleController.createArticle
);
router.patch(
  'articles/:articleId',
  AuthController.verifyEmployee,
  ArticleController.editArticle
);

export default router;
