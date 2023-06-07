import { type Context, type Next } from 'koa'


const errorHandlerMiddleware = async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err) {
        if (typeof err === 'object' && err !== null && 'statusCode' in err) {
            const { statusCode, message } = err as { statusCode: number, message: string }
            ctx.status = statusCode
            ctx.body = { message, statusCode }
        } else {
            console.error(err)
            ctx.status = 500
            ctx.body = { message: 'Internal Server Error' }
        }
    }
}

export const errorHandling = {
    errorHandlerMiddleware
}
