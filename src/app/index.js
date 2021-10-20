//类导入一般大写
//node核心模块最上边
const path = require('path')
//第三方的npm模块
const Koa = require ('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
//自己写的
const errHandler = require('./errhandler')

const router = require('../router')
 
const app = new Koa()

//console.log(process.cwd())
//中间件koa-body  将body中的数据全部写在request.body中

app.use(KoaBody({ 
    multipart:true,
    //formidable不支持的文件格式也可以在这里面设置
    formidable:{
        //在配置选项中option，不推荐使用相对路径../upload
        //在option里的相对路径，不是相对的当前文件，相对process.cwd()
        uploadDir:path.join(__dirname,'../upload'),  //./src/upload相对api的路径，不推荐使用
        keepExtensions:true,   
    },
    parsedMethods: ['POST','PUT','PATCH','DELETE'],
}))
//注册中间件 router是一个对象  所以需要转函数
// app.use(userRouter.routes())
// app.use(goodsRouter.routes())
app.use(KoaStatic(path.join(__dirname,'../upload')))
app.use(parameter(app))
app.use(router.routes())

app.use(router.allowedMethods())


//统一的错误处理
app.on('error',errHandler)

module.exports = app





