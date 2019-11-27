import {Router} from 'express';

// Controller
import GifController from '../controllers/gif.controller';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.get('/', AuthController.verifyEmployee, GifController.fetchAllGif);
router.post('/', AuthController.verifyEmployee, GifController.createGif);
router.delete('/:id', AuthController.verifyEmployee, GifController.deleteGif);
router.post(
    '/:id/comment',
    AuthController.verifyEmployee,
    GifController.addComment
);
router.post('/:id', AuthController.verifyEmployee, GifController.getGif);

export default router;
