import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import Sequelize from 'sequelize';

// Database
import db from './config/database';

// Routes
import AdminRoutes from './routes/admin.routes';
import EmployeeRoutes from './routes/employee.routes';
import articleRoutes from './routes/article.routes';
import gifRoutes from './routes/gif.routes';
import tagRoutes from './routes/tag.routes';

const app = express();
const PORT = process.env.PORT || 8080;
const VERSION_API = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('It works!');
});

// handler
app.use(`${VERSION_API}/auth/admin`, AdminRoutes);
app.use(`${VERSION_API}/auth/employee`, EmployeeRoutes);
app.use(`${VERSION_API}/articles`, articleRoutes);
app.use(`${VERSION_API}/gifs`, gifRoutes);
app.use(`${VERSION_API}/tags`, tagRoutes);

// Test db
db.sync()
  .then(() => {
    app.listen(PORT);
    console.log(`Our app is running on port ${PORT}`);
    console.log('Database connected...');
  })
  .catch(e => console.log('error...', e));

export default app;
