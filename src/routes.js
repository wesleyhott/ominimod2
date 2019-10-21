import { Router } from 'express';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// routes.get('/', (req, res) => {
//   return res.json({ message: 'hello world' });
// });
// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Wesley',
//     email: 'wesley.hott@gmail.com',
//     password_hash: '1231242q31234',
//   });
//   return res.json(user);
// });
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
