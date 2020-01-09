import jwt from 'jsonwebtoken';
import config from '../config';

class AuthController {
  static async decodeToken(req) {
    try {
      // Request for token
      const token = req.headers.authorization;
      if (!token) {
        throw new Error('Token not provided');
      }
      // Grab token
      const jwtToken = token.split(' ')[1];
      //   Decode token
      const decoded = await jwt.verify(jwtToken, config.secret);
      return decoded;
    } catch (e) {
      console.log(e);
      throw new Error('Invalid Auth Token');
    }
  }

  static async verifyAdmin(req, res, next) {
    try {
      const decoded = await AuthController.decodeToken(req);
      if (!decoded.isAdmin) {
        throw new Error('Unauthorized');
      }
      req.admin = decoded.admin;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  // static async checkRole(req, res, next) {
  //   try {
  //     const decoded = await AuthController.decodeToken(req);
  //     req.admin.role = decoded.admin.role;
  //     console.log(req.admin);
  //     console.log(req.admin.role);
  //     if (req.admin.role === 'Admin') {
  //       next();
  //     }
  //   } catch (err) {
  //     return res.status(401).json({
  //       status: 'error',
  //       message: err.message
  //     });
  //   }
  // }

  // static async verifyAdminRole(req, res, next) {
  //   try {
  //     const decoded = await AuthController.decodeToken(req);
  //     req.admin.role = decoded.admin.role;
  //     checkRole = role => {
  //       if (role === 'Admin') {
  //         next();
  //       }
  //       return true;
  //     };
  //   } catch (e) {
  //     return res.status(401).json({
  //       status: 'error',
  //       message: err.message
  //     });
  //   }
  // }

  static async verifyEmployee(req, res, next) {
    try {
      const decoded = await AuthController.decodeToken(req);
      req.employee = decoded.employee;
      next();
      return true;
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default AuthController;
