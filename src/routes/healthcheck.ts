import Router from "koa-router"


var router = new Router()

router.get('/', async (ctx) => {
    try {
        ctx.body = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            message: "Server internal error"
          }
    }

  });

  export default router