let test = require('./contorller/updateNews')
const Koa = require('koa2')
const bodyParser = require('koa-bodyparser')
const app = new Koa();

// test('knowyouself')
app.use(bodyParser)
app.use(async(ctx, next) => {
    // await next();
    // ctx.response.type = 'text/html';
    ctx.response.body = { test: 'sucess' };
});
app.listen(3333)
console.log('start on 3333');