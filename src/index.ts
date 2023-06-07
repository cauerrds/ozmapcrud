import Koa from 'koa'
import { koaSwagger } from 'koa2-swagger-ui';
import yaml from 'yamljs';
import bodyParser from 'koa-bodyparser';
import healthcheckRoutes from './routes/healthcheck'
import usersRoutes from './routes/users'
import { config } from './config';
import { database } from './db';
import { errorHandling } from './middlewares/error.middleware';

const koa = new Koa();


const spec = yaml.load('./src/public/docs.yaml')
usersRoutes.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))


koa.use(bodyParser())
koa.use(errorHandling.errorHandlerMiddleware)

koa
  .use(usersRoutes.routes())
  .use(usersRoutes.allowedMethods())

koa
  .use(healthcheckRoutes.routes())
  .use(healthcheckRoutes.allowedMethods());



const server = koa.listen(config.PORT, async () => {
  const db = await database.openConnection()
  db.close()
  console.log(`Server running in  http://localhost:${config.PORT}`);
  console.log(`Docs on  http://localhost:${config.PORT}/docs`);

});


export { server }