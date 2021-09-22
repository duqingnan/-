// 项目入口文件
const {APP_POST} = require('./config/config.default')
const app = require('./app')


//端口去配置，不要写死，用
app.listen(APP_POST,()=>{
    console.log(`server is running on http://localhost:${APP_POST}`) 
})