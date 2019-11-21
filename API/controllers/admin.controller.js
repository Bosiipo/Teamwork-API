import Admin from '../models/Admin.model';
import Employee from '../models/Employee.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

class AdminController {
  static async registerAdmin(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;
      if (!firstname || !lastname || !email || !password) {
        throw new Error('Incorrect parameters');
      }
      const hashedPassword = await bcrypt.hashSync(password, 10);
      //   console.log(hashedPassword);
      const emailIni = await Admin.findOne({ where: { email: email } });
      if (emailIni) {
        throw new Error('Admin already exists');
      }
      const admin = await Admin.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
      });
      const safeAdmin = {
        id: admin.id,
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email
      };
      const jwtToken = jwt.sign(
        { admin: safeAdmin, isAdmin: true },
        config.secret,
        {
          expiresIn: 86400
        }
      );
      return res.status(201).json({
        status: 'success',
        message: 'Admin Registered',
        token: `Bearer ${jwtToken}`,
        Admin: safeAdmin
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Incorrect parameters');
      }
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        throw new Error(`Admin does not exist`);
      }
      const result = await bcrypt.compare(password, admin.password);
      if (!result) {
        throw new Error(`Password doesn't match our records`);
      }
      const safeAdmin = {
        id: admin.id,
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email
      };
      const jwtToken = jwt.sign(
        { admin: safeAdmin, isAdmin: true },
        config.secret,
        { expiresIn: 86400 }
      );
      return res.status(200).json({
        status: 'success',
        message: 'Admin Logged in',
        token: `Bearer ${jwtToken}`,
        admin: safeAdmin
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }
  static async createEmployee(req, res) {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        gender,
        jobRole,
        department,
        address
      } = req.body;
      if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !gender ||
        !jobRole ||
        !department ||
        !address
      ) {
        throw new Error('Incorrect parameters');
      }
      const adminId = req.admin.id;
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const emailIni = await Employee.findOne({ where: { email: email } });
      if (emailIni) {
        throw new Error(`Employee already exists!`);
      }
      const employee = await Employee.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        gender,
        jobRole,
        department,
        address,
        adminId
      });
      const safeEmployee = {
        adminId,
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
        gender: employee.gender,
        jobRole: employee.jobRole,
        department: employee.department,
        address: employee.address
      };
      const jwtToken = jwt.sign({ employee: safeEmployee }, config.secret, {
        expiresIn: 86400
      });
      return res.status(201).json({
        status: 'success',
        message: 'Employee Registered',
        token: `Bearer ${jwtToken}`,
        employee: safeEmployee
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
        message: err.message
      });
    }
  }
}

export default AdminController;
