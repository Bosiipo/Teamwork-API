import { Router } from 'express';

// Controller
import AdminController from '../controllers/admin.controller';
import AuthController from '../controllers/auth.controller';
// import EmployeeController from '../controllers/employee.controller';

const router = Router();

router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);
router.post(
  '/create-user',
  AuthController.verifyAdmin,
  AdminController.createEmployee
);
router.get(
  '/employee/:id',
  AuthController.verifyAdmin,
  AdminController.getEmployeeProfile
);

export default router;
