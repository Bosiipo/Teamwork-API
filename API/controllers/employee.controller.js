import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Employee from '../models/Employee.model';
import config from '../config';

class EmployeeController {
  static async loginEmployee(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error(`Incorrect Parameters!`);
      }
      const employee = await Employee.findOne({ where: { email } });
      if (!employee) {
        throw new Error(`Employee does not exist!`);
      }
      const result = await bcrypt.compare(password, employee.password);
      if (!result) {
        throw new Error(`Password does not match our records!`);
      }
      const safeEmployee = {
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email
      };
      const jwtToken = jwt.sign({ employee: safeEmployee }, config.secret, {
        expiresIn: 86400
      });
      return res.status(200).json({
        status: 'success',
        message: 'Employee Logged In',
        token: `Bearer ${jwtToken}`,
        employee: safeEmployee
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: err.message
      });
    }
  }
}

export default EmployeeController;
