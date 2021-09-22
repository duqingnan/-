//类导入一般大写
const Koa = require ('koa')

const KoaBody = require('koa-body')

const userRouter = require('../router/user.route')
 
const app = new Koa()
//中间件koa-body  将body中的数据全部写在request.body中
app.use(KoaBody())
//注册中间件 router是一个对象  所以需要转函数
app.use(userRouter.routes())

module.exports = app





