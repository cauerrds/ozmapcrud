import Router from 'koa-router';
import { userController } from '../controller/users.controller';

 const router = new Router();



 router.get('/users', userController.findAll);
 router.get('/users/:nameOrId', userController.findOne);
 router.post('/users', userController.create);
 router.put('/users/:nameOrId', userController.update);
 router.del('/users/:id', userController.remove);

export default router
