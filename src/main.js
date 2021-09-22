// 项目入口文件
//类导入一般大写
const Koa = require ('koa')
 
const app = new Koa()

//中间件
//ctx记录了所有http的上下文 context
//可以使用node src/main.js运行  
app.use((ctx,next)=>{
    ctx.body = 'hello api'

})

app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000')
})