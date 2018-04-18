const router = require('koa-router')
router.get('/api/getnews', async(ctx, next) => {
    ctx.response.body = { test: 'sucess' }
})